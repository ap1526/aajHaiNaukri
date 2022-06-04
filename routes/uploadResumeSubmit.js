const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { uploadResumes } = require('../db/models/submitResume.model');
const { signUp } = require('../db/models/signup.model');


router.post("/", (req, res) => {
    signUp.find({
        mobileNo: req.body.mobileNo
    }).then((doc) => {
        if (doc) {
            let resume = new uploadResumes(req.body);

            resume.save().then((s) => {
                if (s.profileImage === '') {
                    uploadResumes.updateOne({
                        mobileNo: req.body.mobileNo
                    }, {
                        $set:
                        {
                            profileImage: req.body.uploadedProfile
                        }
                    }).then((s) => {
                        res.send(s);
                    })
                } else {
                    res.send(s);
                }
            })
        } else {
            res.send(false);
        }
    })
})


router.get('/getResumeData/:mobileNo', (req, res) => {
    
    console.log(req.params.mobileNo);
    
    uploadResumes.findOne({
        mobileNo: req.params.mobileNo
    }).then((doc) => {
        res.json(doc);
    })
})

module.exports = router;