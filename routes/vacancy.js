const express = require('express');
const { Skill } = require('../db/models/skill.model');
const { VacancyModel } = require('../db/models/vacancy.model');
const router = express.Router();


router.get('/', (req, res) => {

    var data = [];
    var i = 0;

    VacancyModel.aggregate(
        [
            {
                '$lookup': {
                    'from': 'uploadresumes',
                    'localField': 'skillId',
                    'foreignField': 'skill.skillTitle',
                    'as': 'match'
                }
            }
        ]
    ).then((arr) => {

        arr.forEach((doc) => {

            if (Object.entries(doc.match).length === 0) {
                res.send("There Are No Employees!")
            } else {

                data[i] = doc.match
                i++;
            }
        });

        res.send(data);
        
    }).catch((err) => {
        res.sendStatus(201);
    })

});


router.post('/', (req, res) => {

    if (req.body.skillId) {

        Skill.find({
            _id: req.body.skillId
        }).then((subskill) => {


            if (Object.entries(subskill).length === 0) {

                res.send("Skill Not Found!")
            } else {

                VacancyModel.find({
                    skillId: subskill[0]._id
                }).then((vacancy) => {

                    if (Object.entries(vacancy).length === 0) {

                        let newVacancy = new VacancyModel({
                            name: subskill[0].name,
                            skillId: subskill[0]._id,
                            subSkillId: subskill[0].subSkillId,
                            mainSkillId: subskill[0].mainSkillId
                        });

                        newVacancy.save().then((list) => {

                            res.send(list)
                        }).catch((error) => {
                            res.sendStatus(400).send(error);
                        });

                    } else {
                        res.send("Vacancy Already Exist...No Need to Post Again!");
                    }

                });

            }

        });

    } else {
        res.send("Select The Category To Create the Vacancy!")
    }

})

module.exports = router