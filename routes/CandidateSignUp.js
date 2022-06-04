const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { signUp } = require('../db/models/signup.model');



router.post('/', (req, res) => {
    signUp.findOne({
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

            const newUser = new signUp(req.body);

            newUser.save().then((obj) => {
                res.status(200).json("Done");
            }).catch((e) => {
                res.send(e.message);
            })
        }
    })
});

module.exports = router;