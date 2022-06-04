const { Router } = require('express');
const express = require('express');
const router = express.Router();
const { json } = require('express/lib/response');
const multer = require('multer');


const logofile = multer.diskStorage({

    destination: (req, res, cb) => {
        cb(null, '../companyLogo');
    },
    filename: (req, file, cb) => {
        cb(null, 'Logo_' + Date.now() + '_' + file.originalname.toUpperCase());
    }
})

const uploadLogo = multer({ storage: logofile }).single('file');

router.post('/', async (req, res) => {

    uploadLogo(req, res, function (err) {

        if (err) {
            return res.status(501).json({ error: err });
        } else {
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
        }
    })
});

module.exports = router;