const jwt = require('jsonwebtoken');
const JWT_CODE = "helloalliam$yash";

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add the id to req object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token,JWT_CODE);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
    
}

module.exports = fetchuser;