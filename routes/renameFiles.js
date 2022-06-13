const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { signUp } = require('../db/models/signup.model');
const { uploadResumes } = require('../db/models/submitResume.model');

router.patch("/", (req, res) => {
    console.log(req.body)
    signUp.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set:
        {
            profileImage: req.body.profile,
            resumes: req.body.resume
        }
    }).then(() => {

        uploadResumes.updateOne({
            mobileNo: req.body.mobileNo
        }, {
            $set:
            {
                profileImage: req.body.profile
            }
        }).then(() => {
            res.json(true);
        })
        res.json(true);
    }).catch((e) => {
        res.send(e);
    })
})

module.exports = router;