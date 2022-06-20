const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Admin } = require('../db/models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetch');

const JWT_SECRET = "7359487834davda$pritam";


// Signup Route For Admin
router.post('/signUp', [

    body('email', "Enter Valid Email").isEmail(),
    body('mobileNo', "Entered Number Should Not be Greater then 10!").isLength({ max: 10 }),
    body('mobileNo', "Entered Number Should Not be less than 10!").isLength({ min: 10 }),
    body('password', "Enter Strong Password").isStrongPassword()

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {

        Admin.findOne({
            $or: [
                { mobileNo: req.body.mobileNo },
                { email: req.body.email }
            ]
        }).then(async (adminFound) => {

            if (adminFound) {
                if (adminFound.mobileNo === req.body.mobileNo) {
                    return res.status(201).json("Mobile Number Already Exists");
                }
                else if (adminFound.email === req.body.email) {
                    return res.status(201).json("Email Already Exists");
                }
            } else {

                const salt = await bcrypt.genSalt(10);
                const securedPass = await bcrypt.hash(req.body.password, salt);

                let admin = new Admin({
                    email: req.body.email,
                    mobileNo: req.body.mobileNo,
                    password: securedPass
                });

                admin.save().then((response) => {

                    const data = {
                        admin: {
                            id: admin.id
                        }
                    }

                    const authToken = jwt.sign(data, JWT_SECRET);
                    console.log(authToken);

                    // TEMPORARY GIVING RESPONSE
                    res.json({ response, authToken });
                }).catch((e) => {
                    res.status(400).send(e);
                })
            }
        })
    }
});


// Authenticate A User

router.post('/login', [
    body('mobileNo', "Entered Number Should Not be Greater then 10!").isLength({ max: 10 }),
    body('mobileNo', "Entered Number Should Not be less than 10!").isLength({ min: 10 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const { mobileNo, password } = req.body;

    try {

        let adminUser = await Admin.findOne({ mobileNo });

        if (!adminUser) {
            return res.json({ error: "Mobile no does not exist." });
        }
        const comparePassword = await bcrypt.compare(password, adminUser.password);

        if (!comparePassword) {
            return res.json({ error: "Wrong password. Try again." });
        }

        const data = {
            admin: {
                id: adminUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // TEMPORARY GIVING ADMINUSER DETAILS
        return res.json({ adminUser, authToken });

    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});


// Get User Details With Login required
router.post('/getUser', fetchUser, async (req, res) => {

    try {
        userId = req.admin.id;
        const user = await Admin.findById(userId).select("-password");
        return res.send(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
})


module.exports = router