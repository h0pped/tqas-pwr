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
        CALLENDAR_ERROR,
    },
} = require('../config/index.config')

module.exports.createListOfClasses = async (req, res) => {
    try {
        let calendarRules = []
        for (const [userId, properties] of Object.entries(req.body)) {
            const foundEvaluatee = await Evaluatee.findOne({
                where: {
                    userId: userId,
                },
            })
            if (!foundEvaluatee) {
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
            calendarRules.push({
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

            if (!foundAssessment) {
                return res
                    .status(StatusCodes[INVALID_ASSESSMENT_PROVIDED])
                    .send({
                        message: INVALID_ASSESSMENT_PROVIDED,
                    })
            }
            const evaluatedClass = await EvaluatedClass.upsert({
                course_code: properties.course_code,
                course_name: properties.course_name,
            })
            foundEvaluatee.setEvaluated_classes(evaluatedClass[0])
            const evaluation = await Evaluation.create({
                occurrences: properties.occurrences,
                place: properties.place,
                course_code: evaluatedClass[0].dataValues.course_code,
                assessmentId: foundAssessment.dataValues.id,
            })
            evaluation.setAssessment(foundAssessment)
        }
        const message = {}
        ics.createEvents(calendarRules, (error, value) => {
            if (error) {
              return res.status(StatusCodes[CALLENDAR_ERROR]).send({
                message: CALLENDAR_ERROR,})
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

function createCalendarRuleString(time, weekDay, recurrenceRule, assessmentDate) {
    let intervalWeeks = 1
    let numericDay
    let day
    switch (weekDay) {
        case 'mon':
            day = RRule.MO
            numericDay = 0
            break
        case 'tue':
            day = RRule.TU
            numericDay = 1
            break
        case 'wed':
            day = RRule.WE
            numericDay = 2
            break
        case 'thu':
            day = RRule.TH
            numericDay = 3
            break
        case 'fri':
            day = RRule.FR
            numericDay = 4
            break
        case 'sat':
            day = RRule.SA
            numericDay = 5
            break
        case 'sun':
            day = RRule.SU
            numericDay = 6
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

    const daysUntilSemesterStarts = Math.floor(
        (startDate - new Date('01/01/' + startDate.getFullYear())) /
            (24 * 60 * 60 * 1000)
    )
    const isOddSemesterStart = Math.ceil(daysUntilSemesterStarts / 7) % 2 == 1 // check if semester begins with odd or even week

    if (isOddSemesterStart) {
        if (
            ((recurrenceRule == 'odd') & (numericDay < startDate.getDay())) |
            ((recurrenceRule == 'even') & (numericDay >= startDate.getDay()))
        ) {
            intervalWeeks = 2
            startDate.setDate(startDate.getDate() + 7)
        }
    } else {
        if (
            ((recurrenceRule == 'even') & (numericDay < startDate.getDay())) |
            ((recurrenceRule == 'odd') & (numericDay >= startDate.getDay()))
        ) {
            intervalWeeks = 2
            startDate.setDate(startDate.getDate() + 7)
        }
    }
    return {
        rule: new RRule({
            freq: RRule.WEEKLY,
            interval: intervalWeeks,
            byweekday: [day],
            until: endDate,
        }),
        startDate: startDate,
    }
}
