const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { signUp } = require('../db/models/signup.model');
const { uploadResumes } = require('../db/models/submitResume.model');

router.patch("/", (req, res) => {

    signUp.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set:
        {
            profileImage: req.body.profile,
            resumes: req.body.resume
        }
    }).then((r) => {

        uploadResumes.updateOne({
            mobileNo: req.body.mobileNo
        }, {
            $set:
            {
                profileImage: req.body.profile
            }
        }).then((r) => {
            res.json("true");
        })
    }).catch((e) => {
        res.send(e);
    })
})

module.exports = router;