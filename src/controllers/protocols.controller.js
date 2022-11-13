const sequelize = require('../sequelize')
const { QueryTypes } = require('sequelize');

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        GET_PROTOCOLS_SUCCESSFULLY
    },
} = require('../config/index.config')

module.exports.getProtocolsByETMember = async (req, res) => {
    const memberId = req.query.id;

    const protocols = await sequelize.query(`select 
    p.id as "protocol_id",
    p."evaluationId" as "protocol_evaluation_id",
    e.status as "evaluation_status",
    e.course_code as "evaluation_course_code",
    c.course_name  as "evaluation_course_name",
    e.details as "evaluation_details",
    e.enrolled_students as "evaluation_enrolled_students",
    a."name" as "semester_of_assessment",
    et."userId" as "et_memeber_id",
    u.id as "evaluatee_id",
    u.academic_title as "evaluatee_academic_title",
    u.first_name as "evaluatee_first_name",
    u.last_name as "evaluatee_last_name",
    u.email as "evaluatee_email"
    from protocols p
    inner join evaluations e 
    on p."evaluationId" = e.id 
    inner join courses c 
    on e.course_code = c.course_code 
    inner join assessments a 
    on e."assessmentId" = a.id 
    inner join evaluation_teams et 
    on e.id = et."evaluationId" 
    inner join evaluatees e2 
    on e."evaluateeId" = e2.id 
    inner join users u 
    on e2."userId" = u.id 
    where et."userId" = ${memberId};`, { type: QueryTypes.SELECT })

    return res.status(StatusCodes[GET_PROTOCOLS_SUCCESSFULLY]).send({ protocols });

}