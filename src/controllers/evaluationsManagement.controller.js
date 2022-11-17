const sequelize = require('../sequelize')

const Evaluatee = sequelize.models.evaluatee
const Evaluation = sequelize.models.evaluation
const User = sequelize.models.user
const Wzhz = sequelize.models.wzhz
const Assessment = sequelize.models.assessment
const EvaluationTeam = sequelize.models.evaluation_team
const Course = sequelize.models.course

const StatusCodes = require('../config/statusCodes.config')
const {
    responseMessages: {
        USER_DOES_NOT_EXIST,
        EVALUATION_DOES_NOT_EXIST,
        UNKNOWN_EVALUATION_REVIEW_STATUS,
        EVALUATION_REVIEW_SUCCESSFUL,
        EVALUATION_REVIEW_BAD_REQUEST,
        USER_NOT_AUTHORIZED_FOR_OPERATION,
        NO_WZHZ_MEMBER_IN_EVALUATION_TEAM,
        EVALUATEE_CAN_NOT_BE_IN_OWN_EVALUATION_TEAM,
        EVALUATION_TEAMS_CREATED_SUCCESSFULLY,
        USER_ALREADY_IN_THE_EVALUATION_TEAM,
        EVALUATION_TEAM_BAD_REQUREST,
        GET_EVALUATIONS_BY_ET_MEMBER_BAD_REQUEST,
        GET_EVALUATIONS_BY_ET_MEMBER_SUCCESSFULLY
    },
} = require('../config/index.config')

module.exports.evaluateeReviewEvaluation = async (req, res) => {
    try {
        if (!req.body.evaluation_id) {
            return res
                .status(StatusCodes[EVALUATION_REVIEW_BAD_REQUEST])
                .send({ EVALUATION_REVIEW_BAD_REQUEST })
        }
        const evaluation = await Evaluation.findByPk(req.body.evaluation_id)
        if (!evaluation) {
            return res
                .status(StatusCodes[EVALUATION_DOES_NOT_EXIST])
                .send({ EVALUATION_DOES_NOT_EXIST })
        }
        const userData = JSON.parse(
            atob(req.headers.authorization.slice(7).split('.')[1])
        )
        const authorizedUser = await Evaluation.findByPk(
            req.body.evaluation_id,
            {
                include: [
                    {
                        model: Evaluatee,
                        required: true,
                        include: [
                            {
                                model: User,
                                required: true,
                                where: { email: userData.email },
                            },
                        ],
                    },
                ],
            }
        )
        if (!authorizedUser) {
            return res
                .status(StatusCodes[USER_NOT_AUTHORIZED_FOR_OPERATION])
                .send({ USER_NOT_AUTHORIZED_FOR_OPERATION })
        }
        if (!['accepted', 'rejected'].includes(req.body.status.toLowerCase())) {
            return res
                .status(StatusCodes[UNKNOWN_EVALUATION_REVIEW_STATUS])
                .send({ UNKNOWN_EVALUATION_REVIEW_STATUS })
        }
        evaluation.set({
            status:
                req.body.status.charAt(0).toUpperCase() +
                req.body.status.slice(1),
        })
        evaluation.save()
        return res
            .status(StatusCodes[EVALUATION_REVIEW_SUCCESSFUL])
            .send({ EVALUATION_REVIEW_SUCCESSFUL })
    } catch (err) {
        return res
            .status(StatusCodes[EVALUATION_REVIEW_BAD_REQUEST])
            .send({ EVALUATION_REVIEW_BAD_REQUEST })
    }
}

module.exports.createEvaluationTeams = async (req, res) => {
    try {
        for (const [evaluationId, users] of Object.entries(req.body)) {
            const foundWzhzMembers = await Wzhz.findOne({
                where: {
                    userId: users.map((x) => Object.keys(x)).flat(),
                },
            })
            if (!foundWzhzMembers) {
                return res
                    .status(StatusCodes[NO_WZHZ_MEMBER_IN_EVALUATION_TEAM])
                    .send({
                        message: NO_WZHZ_MEMBER_IN_EVALUATION_TEAM,
                    })
            }
            const evaluation = await Evaluation.findByPk(evaluationId)
            if (!evaluation) {
                return res.status(StatusCodes[EVALUATION_DOES_NOT_EXIST]).send({
                    message: EVALUATION_DOES_NOT_EXIST,
                })
            }
            const evaluationTeam = []
            for (const evaluationTeamMember of users) {
                const evaluatee = await Evaluation.findOne({
                    where: { id: evaluationId },
                    include: [
                        {
                            model: Evaluatee,
                            attributes: ['userId'],
                            required: true,
                            where: {
                                userId: Object.keys(evaluationTeamMember)[0],
                            },
                        },
                    ],
                })

                if (evaluatee) {
                    return res
                        .status(
                            StatusCodes[
                            EVALUATEE_CAN_NOT_BE_IN_OWN_EVALUATION_TEAM
                            ]
                        )
                        .send({
                            message:
                                EVALUATEE_CAN_NOT_BE_IN_OWN_EVALUATION_TEAM,
                        })
                }

                const user = await User.findByPk(
                    Object.keys(evaluationTeamMember)[0]
                )
                if (!user) {
                    return res.status(StatusCodes[USER_DOES_NOT_EXIST]).send({
                        message: USER_DOES_NOT_EXIST,
                    })
                }
                evaluationTeam.push(user)
            }
            evaluation.addUsers(evaluationTeam)
        }
        return res
            .status(StatusCodes[EVALUATION_TEAMS_CREATED_SUCCESSFULLY])
            .send({
                message: EVALUATION_TEAMS_CREATED_SUCCESSFULLY,
            })
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res
                .status(StatusCodes[USER_ALREADY_IN_THE_EVALUATION_TEAM])
                .send({
                    message: USER_ALREADY_IN_THE_EVALUATION_TEAM,
                })
        }
        return res
            .status(StatusCodes[EVALUATION_TEAM_BAD_REQUREST])
            .send({ message: EVALUATION_TEAM_BAD_REQUREST })
    }
}

module.exports.getEvaluationsETMemberResponsibleFor = async (req, res) => {
    const memberId = Number(req.query.id);

    if (!memberId) {
        return res
            .status(StatusCodes[GET_EVALUATIONS_BY_ET_MEMBER_BAD_REQUEST])
            .send({ msg: GET_EVALUATIONS_BY_ET_MEMBER_BAD_REQUEST })
    }

    const users = await User.findAll(
        {
            attributes: [
                'id',
                'academic_title',
                'first_name',
                'last_name'
            ]
        }
    );

    const allEvaluationTeams = await EvaluationTeam.findAll(
        {
            attributes: [
                'userId',
                'evaluationId'
            ]
        }
    )

    const evaluatees = await User.findAll({
        attributes: [
            'id',
            'academic_title',
            'first_name',
            'last_name',
            'email',
        ],
        include: [
            {
                model: Evaluatee,
                attributes: ['id', 'last_evaluated_date'],
                required: true,
                include: [
                    {
                        model: Evaluation,
                        required: true,
                        where: {status: 'Ongoing'},
                        include:
                            [{
                                model: Course,
                                required: true,
                            },
                            {
                                model: Assessment
                            }]
                        ,
                    },
                ],
            },
        ],
    })

    evaluatees.forEach((evaluatee) => {
        evaluatee.setDataValue(
            'evaluation_team', allEvaluationTeams.filter(
                (team) => team.evaluationId === evaluatee.evaluatee.evaluations[0].id)
        )
        evaluatee.getDataValue(
            'evaluation_team').forEach(
                (member) => member.setDataValue(
                    'user_full', users.find((user) => user.id === member.userId)
                )
            )
    })

    evaluatees.filter((evaluatee) => 
        evaluatee.getDataValue('evaluation_team').some((member) => member.userId === memberId)
    )

    return res
        .status(StatusCodes[GET_EVALUATIONS_BY_ET_MEMBER_SUCCESSFULLY])
        .send({ evaluatees: evaluatees });
}