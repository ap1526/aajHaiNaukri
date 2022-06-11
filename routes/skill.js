const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { Sector, Category, Field } = require('../db/models/skill.model');


router.post('/sector', (req, res) => {
    
    let sector = new Sector(req.body);
    
    sector.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })
    
});

router.post('/category', (req, res) => {
    
    let category = new Category(req.body);
    
    category.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })
    
});
router.post('/field', (req, res) => {
    
    let field = new Field(req.body);
    
    field.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })
    
});

module.exports = router;