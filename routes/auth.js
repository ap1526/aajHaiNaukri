const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Admin } = require('../db/models/admin.model');

router.post('/', [
    
    body('email', "Enter Valid Email").isEmail(),
    body('mobileNo', "Entered Number Should Not be Greater then 10!").isLength({ max:10 }),
    body('mobileNo', "Entered Number Should Not be less than 10!").isLength({ min:10 }),
    body('password', "Enter Strong Password").isStrongPassword()
    
], (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }else{
        
        Admin.findOne({
            $or : [
                { mobileNo: req.body.mobileNo },
                { email: req.body.email }
            ]
        }).then((adminFound) => {
            
            if(adminFound){
                if(adminFound.mobileNo === req.body.mobileNo){
                    res.status(201).json("Mobile Number Already Exists");
                }
                else if(adminFound.email === req.body.email){
                    res.status(201).json("Email Already Exists");
                }
            }else {
                
                let admin = new Admin(req.body);
                
                admin.save().then((response) => {
                    res.send(response);
                }).catch((e) => {
                    res.status(400).send(e);
                })
            }
            
        })
        
    }
    
});

module.exports = router