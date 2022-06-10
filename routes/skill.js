const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');
const { Skill } = require('../db/models/skill.model');


router.post('/', (req, res) => {
    
    let skill = new Skill(req.body);
    
    skill.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })
    
});

module.exports = router;