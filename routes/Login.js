const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { company } = require('../db/models/company.model');
const { signUp } = require('../db/models/signup.model'); 


router.post("/", (req, res) => {

    //login as Candidate
    if (req.body.as == 'Candidate') {

        signUp.findOne({
            mobileNo: req.body.mobileNo
        }).then((obj) => {
            res.status(200).json(obj);
        }).catch((e) => {
            res.send(e);
        })
    }

    //login as company

    else if (req.body.as == 'Company') {

        company.findOne({
            mobileNo: req.body.mobileNo
        }).then((obj) => {
            res.status(200).json(obj);
        }).catch((e) => {
            res.send(e);
        })
    }
})

module.exports = router;