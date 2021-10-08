const jwt = require('jsonwebtoken');
const Teacher = require("../model/teachersDoc");

const authenticate = async(req, res, next) =>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await Teacher.findOne({_id:verifyToken._id, "tokens.token": token});

        if(!rootUser){ throw new Error('User not Found')}

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    }catch(err){
        res.status(401).send(('Unauthorized: No token Provided'));
    }
}
module.exports = authenticate;