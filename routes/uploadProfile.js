const { Router } = require('express');
const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const multer = require('multer');

const profileImagefile = multer.diskStorage({

    destination: (req, res, cb) => {
        cb(null, '../image/profiles')
    },
    filename: (req, file, cb) => {
        cb(null, 'PROFILE_' + Date.now() + '_' + file.originalname.toUpperCase());
    }
})

const uploadProfile = multer({ storage: profileImagefile }).single('file');

router.post('/', (req, res) => {

    uploadProfile(req, res, function (err) {

        if (err) {
            return res.status(501).json({ error: err });
        } else {
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
        }
    })
});

module.exports = router;