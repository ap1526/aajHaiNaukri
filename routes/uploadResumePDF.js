const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');



const resumeFile = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = path.join('image/resumes');
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, 'RESUME_' + Date.now() + '_' + file.originalname.toUpperCase());
    }
});


const uploadResume = multer({ storage: resumeFile }).single('file');

router.post('/', (req, res) => {
    
    try{
        uploadResume(req, res, function (err) {
            if (err) {
                return res.status(501).json({ error: err });
            } else {
                console.log(req.file.originalname);
                return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
            }
        })
    }catch(err){
        res.json({message: err});
    }

});

module.exports = router;