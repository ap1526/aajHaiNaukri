const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');
const axios = require('axios');


router.post("/", (req, res) => {

    var _url = "https://trnsms.soft-techsolutions.com/v3/sms/submit?user=SARDAR&authkey=90d99d6351ecded3ca68&mobile=";
    var mobile_no = (req.body.mobileNo).toString()
    var middle = "&message="
    var otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    var message = " is your GPBS - 2022 account registration verification code. Do not share it with anyone. GPBS 2022&senderid=GPBSEV&smstype=T&templateid=1307163186854846267"

    var URL = _url + mobile_no + middle + otp + message;

    // console.log(URL)

    axios.get(URL)
        .then(param => {
            res.send(otp);
        })
        .catch(err => {
            res.send(err.message);
        });
})

module.exports = router;