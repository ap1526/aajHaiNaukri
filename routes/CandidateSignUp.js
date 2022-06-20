const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { signUp } = require('../db/models/signup.model');
const { body, validationResult } = require('express-validator');


router.post('/', [

    body('email', 'Enter Valid Email').isEmail(),
    body('mobileNo', 'Mobile Number Should Be of 10 Digits').isLength({ min: 13 })

], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        signUp.findOne({
            $or: [
                { mobileNo: req.body.mobileNo },
                { email: req.body.email }
            ]
        }).then(async (user) => {
            if (user) {
                if (user.mobileNo === req.body.mobileNo) {
                    return res.status(201).json("Mobile Number already exists");
                }
                else if (user.email === req.body.email) {
                    return res.status(201).json("Email already exists");
                }
            } else {

                const newUser = await new signUp(req.body);

                newUser.save().then((obj) => {
                    return res.status(200).json("Done");
                }).catch((e) => {
                    return res.json(e.message);
                })
            }
        })
    }


});

module.exports = router;