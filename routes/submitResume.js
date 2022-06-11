const { Router } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();

const { signUp } = require('../db/models/signup.model');
const { submitResume } = require('../db/models/submitResume.model');

router.post('/', async (req, res) => {
    signUp.find({
        mobileNo: req.body.mobileNo
    }).then( async (doc) => {
        if (doc) {
            let resume = await new submitResume(req.body);

            resume.save().then(s => res.send(s))
        } else {
            res.send(false);
        }
    })
})

module.exports =  router;