const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { json } = require('body-parser');
const { send } = require('process');


const path = require('path');

const { onlycity } = require('./db/models');
const { states } = require('./db/models/state.model')

const app = express();

app.use(bodyParser.json());
app.use('/image', express.static(path.join('image/profiles')));


app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id,*");
    res.header('Access-Control-Allow-Credentials', true);

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
})

// IMPORT ROUTES
const uploadResumePDF = require('./routes/uploadResumePDF');
const uploadProfile = require('./routes/uploadProfile');
const uploadLogo = require('./routes/uploadLogo');
const CandidateSignUp = require('./routes/CandidateSignUp');
const renameFiles = require('./routes/renameFiles');
const CompanySignUp = require('./routes/CompanySignUp');
const renameCompanyLogo = require('./routes/renameCompanyLogo');
const Login = require('./routes/Login');
const SubmitResume = require('./routes/submitResume');
const Otp = require('./routes/SendOtp');
const candidateDetails = require('./routes/CandidateDetails');
const uploadResumeSubmit = require('./routes/uploadResumeSubmit');
const skills = require('./routes/skill');
const Auth = require('./routes/auth');
const mobileEmail = require('./routes/mobile-emailExist');


app.use('/resume', uploadResumePDF);
app.use('/profile', uploadProfile);
app.use('/logo', uploadLogo);
app.use('/signUp', CandidateSignUp);
app.use('/renameFiles', renameFiles);
app.use('/company_signUp', CompanySignUp);
app.use('/renamelogo', renameCompanyLogo);
app.use('/login', Login);
app.use('/submitResume', SubmitResume);
app.use('/send_otp', Otp);
app.use('/candidateDetails', candidateDetails);
app.use('/uploadResume', uploadResumeSubmit);
app.use('/skill', skills);
app.use('/admin', Auth);
app.use('/exist', mobileEmail);



// get state
app.get("/get_only_state", (req, res) => {

    states.find({}).then((obj) => {
        res.send(obj);
    }).catch((e) => {
        res.send(e);
    });
});

//Get Only City
app.get("/get_only_city", (req, res) => {

    onlycity.find({}).then((obj) => {
        res.send(obj)
    }).catch((e) => {
        res.send(e);
    });

});

app.get("/get_only_state/:id", (req, res) => {

    states.find({
        id: req.params.id
    }).then((obj) => {
        res.send(obj);
    }).catch((e) => {
        res.send(e);
    });
});

// get city
app.get("/get_city_from_state/:stateId", (req, res) => {
    states.find({
        id: req.params.stateId
    }).then((obj) => {
        res.send(obj);
    }).catch((e) => {
        res.send(e);
    });
});


app.get("/get_city_from_state/:stateId/:cityId", (req, res) => {

    states.find({
        "id": req.params.stateId,
        "cities.id": req.params.cityId
    },
        {
            "cities.$": 1
        }).then((obj) => {
            res.send(obj);
        }).catch((e) => {
            res.send(e);
        });

});


app.listen(3000, () => {
    console.log("Listening On Port 3000!")
});

mongoose.Promise = global.Promise;

mongoUrl = "mongodb://192.168.1.111:27017/Company?directConnection=true&appName=mongosh+1.2.3";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((e) => {
    console.log("Error While Connecting the Server!");
    console.log(e);
});