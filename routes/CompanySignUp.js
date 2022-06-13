const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');
const { body, validationResult } = require('express-validator');

const { company } = require('../db/models/company.model');


router.post('/',[
    body('email', 'Enter Valid Email').isEmail(),
    body('mobileNo', 'Moblie Number Should Not Be Less Than 10 Digit!').isLength({ min: 13  }),
    body('mobileNo', 'Moblie Number Should Not Be Greater Than 10 Digit!').isLength({ max: 13  })
] , async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        
        return res.status(400).json({errors: errors.array()});
        
    }else{
        
        company.findOne({
            $or: [
                { mobileNo: req.body.mobileNo },
                { email: req.body.email }
            ]
        }).then( async (user) => {
            if (user) {
                if (user.mobileNo === req.body.mobileNo) {
                    return res.status(201).json("Mobile Number already exists");
                }
                else if (user.email === req.body.email) {
                    return res.status(201).json("Email already exists");
                }
            } else {
    
                let newCompany = await new company(req.body)
    
                newCompany.save().then((obj) => {
                    res.status(200).json("Done");
                }).catch((error) => {
                    res.send(error.message);
                })
            }
        })
    }
    
})



module.exports = router;