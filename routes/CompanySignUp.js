const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { company } = require('../db/models/company.model');


router.post('/', (req, res) => {

    company.findOne({
        $or: [
            { mobileNo: req.body.mobileNo },
            { email: req.body.email }
        ]
    }).then((user) => {
        if (user) {
            if (user.mobileNo === req.body.mobileNo) {
                res.status(201).json("Mobile Number already exists");
            }
            else if (user.email === req.body.email) {
                res.status(201).json("Email already exists");
            }
        } else {

            let newCompany = new company(req.body)

            newCompany.save().then((obj) => {
                res.status(200).json("Done");
            }).catch((error) => {
                res.send(error.message);
            })
        }
    })
})

module.exports = router;