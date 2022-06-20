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

    let mainskill = await MainSkill.find({});
    res.send(mainskill);
})

router.get('/getMainSkill/:mainSkillid', async (req, res) => {

    let skill = await MainSkill.find({ _id: req.params.mainSkillid });
    res.send(skill);
});

router.get('/subSkill/:mainSkillid', async (req, res) => {

    let subskill = await SubSkill.find({ mainSkillId: req.params.mainSkillid });
    res.send(subskill);
})

router.get('/getSubSkill/:subSkillid', async (req, res) => {

    let skill = await SubSkill.find({ _id: req.params.subSkillid });
    res.send(skill);
});

router.get('/skills/:subSkillid', async (req, res) => {

    let skill = await Skill.find({ subSkillId: req.params.subSkillid });
    res.send(skill);
})

router.get('/getSkill/:skillid', async (req, res) => {

    let skill = await Skill.find({ _id: req.params.skillid });
    res.send(skill);
});


module.exports = router;