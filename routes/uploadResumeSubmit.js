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
                        res.json("done");
                    })
                } else {
                    res.json("done");
                }
            })
        } else {
            res.send(false);
        }
    })
})


router.get('/getResumeData/:mobileNo', (req, res) => {

    uploadResumes.findOne({
        mobileNo: req.params.mobileNo
    }).then((doc) => {
        res.json(doc);
    })
})

router.patch('/updateResume', (req, res) => {

    uploadResumes.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set: req.body
    }).then((doc) => {
        res.json(doc);
    }).catch((e) => {
        res.json(e);
    })
})

router.patch('/updateEducation', (req, res) => {

    uploadResumes.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set: {
            education: req.body.education
        }
    }).then((doc) => {
        res.json(doc);
    }).catch((e) => {
        res.json(e);
    })
})

router.patch('/updateSkill', (req, res) => {

    uploadResumes.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set: {
            skill: req.body.skill
        }
    }).then((doc) => {
        res.json(doc);
    }).catch((e) => {
        res.json(e);
    })
});

router.patch('/updateSociallink', (req, res) => {

    uploadResumes.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set: {
            socialLink: req.body.socialLink
        }
    }).then((doc) => {
        res.json(doc);
    }).catch((e) => {
        res.json(e);
    })
});

module.exports = router;