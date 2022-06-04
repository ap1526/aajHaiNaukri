const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');


const { company } = require('../db/models/company.model');


router.patch('/', (req, res) => {
    company.updateOne({
        mobileNo: req.body.mobileNo
    }, {
        $set:
        {
            logo: req.body.logo
        }
    }).then(() => {
        res.status(200).json("true");
    }).catch((e) => {
        res.send(e);
    })
})

module.exports = router;