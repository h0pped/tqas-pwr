const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload');
const sequelize = require('../sequelize')
router.use(fileUpload());

let User = sequelize.models.user;

router.get('/', (req, res) => {
    res.send({ msg: 'Hello from upload_users' })
})

router.post('/new_user_list', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } 
        else {
            var file = req.files.files;
            var users = file.data.toString('utf8');
            console.log(users);

            let arr = users.split('\n'); 
            console.log(arr);
            console.log(arr.length);
            for (var i = 0; i < arr.length; i++) {
                let props = arr[i].split(',');
                console.log(props[1]);
                const jane = await User.create({ 
                    first_name: props[1], 
                    last_name: props[2],
                    academic_title: props[0],
                    email: props[3],
                    password: null,
                    account_status: 'inactive',
                    status_date: Date.now(),
                    user_type: props[4]});
                console.log(jane);
              }

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router
