const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { signUp } = require('../db/models/signup.model');


router.get("/:mobile", async (req, res) => {
    await signUp.find({
        mobileNo: req.params.mobile
    }).then((user) => {
        res.json(user);
    })
});

module.exports = router;