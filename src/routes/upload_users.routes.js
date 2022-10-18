const express = require('express')
const fileUpload = require('express-fileupload')
const sequelize = require('../sequelize')
const excelToJson = require('convert-excel-to-json')
const isEmail = require('../utils/validateEmail')

const router = express.Router()
router.use(fileUpload())

const User = sequelize.models.user
const Evalueatee = sequelize.models.evaluatee

router.post('/append_users', async (req, res) => {
    try {
        if (!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded',
            })
        } else {
            const file = req.files.files
            if (file.mimetype == 'text/csv') {
                parse_csv(file)
            } else if (
                file.mimetype ==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                parse_excel(file.data)
            }

            return res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            })
        }
    } catch (err) {
        return res.status(500).send({err})
    }
})

async function parse_csv(file) {
    const users = file.data.toString('utf8')
    const arr = users.split('\n')

    for (let i = 0; i < arr.length; i++) {
        const props = arr[i].split(',')
        if (i == 0 && !isEmail(props[3])) {
            continue
        }
        const user_identifier = await User.upsert(
            {
                first_name: props[1],
                last_name: props[2],
                academic_title: props[0],
                email: props[3],
                password: null,
                account_status: 'inactive',
                status_date: Date.now(),
                user_type: props[4],
            },
            {
                fields: [
                    'first_name',
                    'last_name',
                    'academic_title',
                    'user_type',
                ],
                conflictFields: ['email'],
            }
        )
        await Evalueatee.upsert(
            {
                userId: user_identifier[0].get('id'),
                last_evaluated_date: props[5],
            },
            {
                fields: ['last_evaluated_date'],
                conflictFields: ['userId'],
            }
        )
    }
}

async function parse_excel(buffer) {
    const arr = Object.values(excelToJson({ source: buffer }))[0]
    for (let i = 0; i < arr.length; i++) {
        if (!isEmail(arr[i].D)) {
            continue
        }
        try {
        const user_identifier = await User.upsert(
            {
                first_name: arr[i].B,
                last_name: arr[i].C,
                academic_title: arr[i].A,
                email: arr[i].D,
                password: null,
                account_status: 'inactive',
                status_date: Date.now(),
                user_type: arr[i].E,
            },
            {
                fields: [
                    'first_name',
                    'last_name',
                    'academic_title',
                    'user_type',
                ],
                conflictFields: ['email'],
            }
        )
        await Evalueatee.upsert(
            {
                userId: user_identifier[0].get('id'),
                last_evaluated_date: arr[i].F,
            },
            {
                fields: ['last_evaluated_date'],
                conflictFields: ['userId'],
            }
        )
    }
    catch(err){
        console.log(err)
    }
    }
}

module.exports = router
