const jwt = require('jsonwebtoken');

const JWT_SECRET = "7359487834davda$pritam";

const fetchUser = (req, res, next) => {
    
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({ error: "Please Authenticate using a valid Token" });
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.admin = data.admin;
        console.log(req.admin);
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using a valid Token" });
    }
    
}

module.exports = fetchUser;