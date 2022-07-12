
const express = require('express');
const router = express.Router();

const { company } = require('../db/models/company.model');
const { signUp } = require('../db/models/signup.model');
const { Admin } = require('../db/models/admin.model');


router.get("/mobileNo", async (req, res) => {

    var mobile = await signUp.distinct('mobileNo');

    await company.distinct('mobileNo').then((r) => {
        for (let i = 0; i < r.length; i++) {
            mobile.push(r[i]);
        }
         Admin.distinct('mobileNo').then((r) => {
            for (let i = 0; i < r.length; i++) {
                mobile.push(r[i]);
            }
            res.send(mobile);
        })

    })
})

module.exports = router;