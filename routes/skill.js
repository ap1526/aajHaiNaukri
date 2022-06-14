const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');

const { MainSkill, SubSkill, Skill } = require('../db/models/skill.model');


router.post('/mainSkill', (req, res) => {

    let skill = new MainSkill(req.body);

    skill.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })

});

router.post('/subSkill', (req, res) => {

    let skill = new SubSkill(req.body);

    skill.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })

});
router.post('/skills', (req, res) => {

    let skill = new Skill(req.body);

    skill.save().then((response) => {
        res.send(response);
    }).catch((e) => {
        res.send(e);
    })

});

router.get('/mainSkill', async (req, res) => {
    let mskill = await MainSkill.find({});
    res.send(mskill);
})

router.get('/getSkill/:subSkillId', async (req, res) => {

    Skill.find({
        subSkillId: req.params.subSkillId
    }).then((printList) => {
        res.send(printList)
    }).catch((error) => {
        res.status(404).send(error);
    });

});

router.get('/getSubSkill/:mainSkillId', (req, res) => {

    SubSkill.find({
        mainSkillId: req.params.mainSkillId
    }).then((printList) => {
        res.send(printList)
    }).catch((error) => {
        res.status(404).send(error);
    });

});

module.exports = router;