const { Router } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { uploadResumes } = require('../db/models');

const profileImagefile = multer.diskStorage({

    destination: (req, res, cb) => {
        cb(null, '../image/profiles')
    },
    filename: (req, file, cb) => {
        cb(null, 'PROFILE_' + Date.now() + '_' + file.originalname.toUpperCase());
    }
})
console.log("hello1");

const uploadProfile = multer({ storage: profileImagefile }).single('file');

router.post('/', (req, res) => {
    console.log("hello2");
    uploadProfile(req, res, function (err) {

        if (err) {
            return res.status(501).json({ error: err });
        } else {
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
        }
    })
});

router.get('/deleteProfile/:mobileNo/:filepath', (req, res) => {

    const path = './image/profiles/' + req.params.filepath;

    try {
        fs.unlinkSync(path);
        uploadResumes.updateOne({
            mobileNo: req.params.mobileNo
        }, {
            $set: {
                profileImage: ''
            }
        }).then(r => res.send("done"))

        //file removed
    } catch (err) {
        res.send(err);
        console.log(err);
    }
})

module.exports = router;