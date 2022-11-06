const sequelize = require('../sequelize')
const { RRule, RRuleSet, rrulestr } = require('rrule')
const ics = require('ics')
const { writeFileSync } = require('fs')
const { sendMail } = require('../mailer')

const EvaluatedClass = sequelize.models.evaluated_class
const Evaluatee = sequelize.models.evaluatee
const Evaluation = sequelize.models.evaluation
const Assessment = sequelize.models.assessment
const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        INVALID_EVALUATEE_PROVIDED,
        INVALID_ASSESSMENT_PROVIDED,
        LIST_OF_EVALUATED_CLASSES_CREATED,
        LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
    },
} = require('../config/index.config')

module.exports.createListOfClasses = async (req, res) => {
    try {
        let cal = []
        for (const [userId, properties] of Object.entries(req.body)) {
            const foundEvaluatee = await Evaluatee.findOne({
                where: {
                    userId: userId,
                },
            })
            if (foundEvaluatee == null) {
                return res
                    .status(StatusCodes[INVALID_EVALUATEE_PROVIDED])
                    .send({
                        message: INVALID_EVALUATEE_PROVIDED,
                    })
            }
            const foundAssessment = await Assessment.findOne({
                where: {
                    id: properties.assessment_id,
                },
            })
            let { rule, startDate } = createCalendarRuleString(
                properties.time,
                properties.day,
                properties.occurrences,
                foundAssessment.dataValues.createdAt
            )

            rule = rule.toString().replace('RRULE:', '')
            cal.push({
                title: properties.course_name,
                busyStatus: 'FREE',
                start: [
                    startDate.getFullYear(),
                    startDate.getMonth() + 1,
                    startDate.getDate(),
                    10,
                    0,
                ],
                duration: { minutes: 120 },
                recurrenceRule: rule,
            })

            if (foundAssessment == null) {
                return res
                    .status(StatusCodes[INVALID_ASSESSMENT_PROVIDED])
                    .send({
                        message: INVALID_ASSESSMENT_PROVIDED,
                    })
            }
            const evaluatedClass = await EvaluatedClass.upsert({
                subject_code: properties.subject_code,
                course_name: properties.course_name,
            })
            foundEvaluatee.setEvaluated_classes(evaluatedClass[0])
            const evaluation = await Evaluation.create({
                occurrences: properties.occurrences,
                place: properties.place,
                subject_code: evaluatedClass[0].dataValues.subject_code,
                assessmentId: foundAssessment.dataValues.id,
            })
            evaluation.setAssessment(foundAssessment)
        }
        let message = {}
        ics.createEvents(cal, (error, value) => {
            if (error) {
              console.log(error)
            }
            message.attachments = [{raw: value}]
            writeFileSync(`${__dirname}/event.ics`, value)
            sendMail(
                'danylo.wasylyshyn@gmail.com',
                'TQAS - Classes to evaluate',
                "Proposed classes for evaluation",
                `${__dirname}/event.ics`
            )

          })
        return res.status(StatusCodes[LIST_OF_EVALUATED_CLASSES_CREATED]).send({
            message: LIST_OF_EVALUATED_CLASSES_CREATED,
        })
    } catch (err) {
        return res
            .status(StatusCodes[LIST_OF_EVALUATED_CLASSES_BAD_REQUEST])
            .send({
                message: LIST_OF_EVALUATED_CLASSES_BAD_REQUEST,
            })
    }
}

function createCalendarRuleString(time, week_day, occurrences, assessmentDate) {
    let interval = 1
    let numeric_day
    let day
    switch (week_day) {
        case 'mon':
            day = RRule.MO
            numeric_day = 0
            break
        case 'tue':
            day = RRule.TU
            numeric_day = 1
            break
        case 'wed':
            day = RRule.WE
            numeric_day = 2
            break
        case 'thu':
            day = RRule.TH
            numeric_day = 3
            break
        case 'fri':
            day = RRule.FR
            numeric_day = 4
            break
        case 'sat':
            day = RRule.SA
            numeric_day = 5
            break
        case 'sun':
            day = RRule.SU
            numeric_day = 6
            break
        default:
            return null
    }
    const year = assessmentDate.getFullYear()
    let startDate
    let endDate
    if (assessmentDate < new Date('02/15/' + year)) {
        startDate = new Date('10/01/' + (year - 1))
        endDate = new Date('03/01/' + year)
    } else if (
        (new Date('02/15/' + year) <= assessmentDate) &
        (assessmentDate < new Date('09/15/' + year))
    ) {
        startDate = new Date('03/01' + year)
        endDate = new Date('10/01/' + year)
    } else {
        startDate = new Date('10/01/' + year)
        endDate = new Date('03/01/' + (year + 1))
    }
    console.log(startDate)

    const days = Math.floor(
        (startDate - new Date('01/01/' + startDate.getFullYear())) /
            (24 * 60 * 60 * 1000)
    )
    const oddSemesterStart = Math.ceil(days / 7) % 2 == 1 // check if semester begins with odd or even week

    if (oddSemesterStart) {
        if (
            ((occurrences == 'odd') & (numeric_day < startDate.getDay())) |
            ((occurrences == 'even') & (numeric_day >= startDate.getDay()))
        ) {
            interval = 2
            startDate.setDate(startDate.getDate() + 7)
        }
    } else {
        if (
            ((occurrences == 'even') & (numeric_day < startDate.getDay())) |
            ((occurrences == 'odd') & (numeric_day >= startDate.getDay()))
        ) {
            interval = 2
            startDate.setDate(startDate.getDate() + 7)
        }
    }
    return {
        rule: new RRule({
            freq: RRule.WEEKLY,
            interval: interval,
            byweekday: [day],
            until: endDate,
        }),
        startDate: startDate,
    }
}
