const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');
const { some } = require('lodash');

const { MainSkill, SubSkill, Skill, Skilldemo } = require('../db/models/skill.model');


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

router.get('/subSkillList/:namelist', async (req, res) => {

    console.log(req.params.namelist)
    let mainskill = await MainSkill.find({ name: req.params.namelist })
    if (mainskill.length > 0) {
        let subskill = await SubSkill.find({ mainSkillId: mainskill[0]['_id'] })
        subskill.length > 0 ? res.send(subskill) : res.send("No Recoard found");
    } else {
        let subskill = await SubSkill.find({ name: req.params.namelist })

        if (subskill.length > 0) {
            let skill = await Skill.find({ subSkillId: subskill[0]['_id'] })
            skill.length > 0 ? res.send(skill) : res.send("No Recoard found");
        } else {
            res.send(subskill)
            // let skill = await Skill.find({ subSkillId: subid[0]['_id'] })
            // console.log(subid)
            // skill.length > 0 ? res.send(skill) : res.send("No Recoard found");
        }

    }
});

router.get("/skillList/:namelist", async (req, res) => {
    // MainSkill.aggregate(
    //     [{
    //         $lookup: {
    //             from: 'subskills',
    //             let: {
    //                 id: '$_id'
    //             },
    //             pipeline: [
    //                 {
    //                     $match: {
    //                         $expr: {
    //                             $eq: [
    //                                 '$mainSkillId',
    //                                 '$$id'
    //                             ]
    //                         }
    //                     }
    //                 },
    //                 {
    //                     $lookup: {
    //                         from: 'skills',
    //                         let: {
    //                             id: '$mainSkillId'
    //                         },
    //                         pipeline: [
    //                             {
    //                                 $match: {
    //                                     $expr: {
    //                                         $eq: [
    //                                             '$mainSkillId',
    //                                             '$$id'
    //                                         ]
    //                                     }
    //                                 }
    //                             }
    //                         ],
    //                         as: 'skill'
    //                     }
    //                 },
    //             ],
    //             as: 'subskill'
    //         }
    //     },
    //         // {
    //         //     $group: {
    //         //         _id: null,
    //         //         usersDocs: {
    //         //             $push: {
    //         //                 _id: '$_id',
    //         //                 name: '$name',

    //         //             },
    //         //         },
    //         //         addrDocs: {
    //         //             $push: '$subskill',
    //         //         },
    //         //     }
    //         // }
    //     ]
    // ).exec(function (e, d) {
    //     res.send(d)
    // })

    // MainSkill.aggregate([{
    //     $lookup: {
    //         from: "subskills", // collection to join
    //         localField: "_id",//field from the input documents
    //         foreignField: "mainSkillId",//field from the documents of the "from" collection
    //         as: "subskill"// output array field
    //     }
    // }, {
    //     $lookup: {
    //         from: "skills", // from collection name
    //         localField: "_id",
    //         foreignField: "mainSkillId",
    //         as: "skill"
    //     }
    // },
    // {
    //     $project: {
    //         "_id": 1,
    //         "name": 1,
    //         // "Salesperson Key": 1,
    //         // "City": "$lsg.City"
    //     }
    // }], function (error, data) {
    //     return res.json(data);
    //     //handle error case also
    // });
})

router.get('/mainSkillList/:namelist', async (req, res) => {
    console.log(req.params.namelist)

    // MainSkill.aggregate([

    //     // Join with user_info table
    //     {
    //         $lookup: {
    //             from: "subskills",       // other table name
    //             localField: "_id",   // name of mainskill table field
    //             foreignField: "mainSkillId", // name of subskill table field
    //             as: "subskill"         // alias for subskill table
    //         }
    //     },
    //     { $unwind: { path: "$subskill", preserveNullAndEmptyArrays: true } },     // $unwind used for getting data in object or for one record only

    //     // Join with skill table
    //     {
    //         $lookup: {
    //             from: "skills",
    //             localField: "subskill._id",
    //             foreignField: "subSkillId",
    //             as: "skill"
    //         }
    //     },
    //     { $unwind: { path: "$skill", preserveNullAndEmptyArrays: true } },

    //     // define which fields are you want to fetch
    //     // {
    //     //     $project: {
    //     //         _id: 0,
    //     //         name: 1,
    //     //         "subskill.name": 1,
    //     //         "skill.name": 1,
    //     //     }
    //     // },
    //     {
    //         $group: {
    //             _id: {
    //                 "name":"$name",
    //             "subskill": "$subskill.name",
    //             "skill": "$skill.name",
    //             }
    //         }
    //     }
    // ]).exec(function (e, d) {
    //     res.send(d)
    // });

    MainSkill.aggregate([{
        $lookup: {
            from: "subskills",
            let: { id: "$_id" },

            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$mainSkillId", "$$id"] }
                            ]
                        }
                    }
                }
            ],
            as: "stockdata",
        }
    }, {
        $group: {
            _id: null,
            usersDocs: {
                $push: {
                    _id: '$_id',
                    name: '$name',

                },
            },
            addrDocs: {
                $push: '$stockdata',
            },
        }
    },
    {
        $addFields: {
            addrDocs: {
                $reduce: {
                    input: '$addrDocs',
                    initialValue: [],
                    in: {
                        $concatArrays: ['$$value', '$$this'],
                    },
                },
            },
        },
    },
    {
        $project: {
            mixedDocs: {
                $concatArrays: ['$usersDocs', '$addrDocs'],
            },
        },
    },
    {
        $unwind: '$mixedDocs',
    },
    {
        $replaceRoot: {
            newRoot: '$mixedDocs',
        },
    },
    //skill

    {
        $lookup: {
            from: "skills",
            let: { id: "$_id" },

            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$mainSkillId", "$$id"] }
                            ]
                        }
                    }
                }
            ],
            as: "skill",
        }
    }, {
        $group: {
            _id: null,
            users1Docs: {
                $push: {
                    _id: '$_id',
                    name: '$name',

                },
            },
            addr1Docs: {
                $push: '$skill',
            },
        }
    },
    {
        $addFields: {
            addr1Docs: {
                $reduce: {
                    input: '$addr1Docs',
                    initialValue: [],
                    in: {
                        $concatArrays: ['$$value', '$$this'],
                    },
                },
            },
        },
    },
    {
        $project: {
            mixed1Docs: {
                $concatArrays: ['$users1Docs', '$addr1Docs'],
            },
        },
    },
    {
        $unwind: '$mixed1Docs',
    },
    {
        $replaceRoot: {
            newRoot: '$mixed1Docs',
        },
    },
    { $match: { name: { '$regex': req.params.namelist, '$options': 'i' } } }
    ]
    ).exec(function (e, d) {
        res.send(d)
    });

    // let mainskill = await MainSkill.find({ name: { '$regex': req.params.namelist, '$options': 'i' } })

    // if (mainskill.length > 0) {
    //     return res.send(mainskill);
    // } else {
    //     let subskill = await SubSkill.find({ name: { '$regex': req.params.namelist, '$options': 'i' } })

    //     if (subskill.length > 0) {
    //         return res.send(subskill);
    //     } else {
    //         let skill = await Skill.find({ name: { '$regex': req.params.namelist, '$options': 'i' } })

    //         if (skill.length > 0) {
    //             return res.send(skill);
    //         }
    //     }
    // }





})

// router.get('/mainSubSkillList/:namelist', async (req, res) => {


//     console.log(req.params.namelist);
//     let mainskill = await Skilldemo.findOne({ name: req.params.namelist }, { 'subSkills': 1, '_id': 0 })
//     if (mainskill) {
//         let skill = mainskill.subSkills;
//         let subskill = [];
//         // await skill.forEach(element => {
//         //     subskill.push({ 'name': element })
//         // });
//         return res.send(mainskill.subSkills)
//     }
// })
//     let subskill = await Skilldemo.findOne({ name: req.params.namelist }, { 'subSkills': 1, '_id': 0 })



//     // let i = 0;
//     // let text = "";

//     // while (mainskill[i]) {
//     //   text += mainskill[i];
//     //   i++;
//     // }
//     // console.log(text)
//     // console.log("hello")
//     // console.log(req.params.namelist)
//     // let mainskill = await MainSkill.find({name:{'$regex' : req.params.namelist, '$options' : 'i'}},{"subskills":1})
//     // res.status(200).json(mainskill);
// });

// router.post("/mainSubSkillList", async (req, res) => {
//     let skill = new Skilldemo(req.body);

//     skill.save().then((response) => {
//         res.send(response);
//     }).catch((e) => {
//         res.send(e);
//     })
// })

module.exports = router;