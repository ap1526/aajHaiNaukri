const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const { signUp } = require('../db/models/signup.model');
const { uploadResumes } = require('../db/models/submitResume.model');

const profileImagefile = multer.diskStorage({

    destination: (req, res, cb) => {
        let uploadPath = path.join('image/profiles');
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, 'PROFILE_' + Date.now() + '_' + file.originalname.toUpperCase());
    }
})


const uploadProfile = multer({ storage: profileImagefile }).single('file');

router.post('/', async (req, res) => {

    await uploadProfile(req, res, function (err) {

        if (err) {
            return res.status(501).json({ error: err });
        } else {
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
        }
    })
});


router.get('/deleteProfile/:mobileNo/:filepath', async (req, res) => {

    const path = './image/profiles/' + req.params.filepath;

    try {

        if (fs.existsSync(path)) {

            uploadResumes.updateOne({
                mobileNo: req.params.mobileNo
            }, {
                $set: { profileImage: null }
            }).then(r => {

                signUp.updateOne({
                    mobileNo: req.params.mobileNo
                }, {
                    $set: { profileImage: null }
                })

                fs.unlinkSync(path);
                res.json("done");
            })
        }


        //file removed
    } catch (err) {
        res.send(err);
    }
});


module.exports = router;