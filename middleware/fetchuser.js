const jwt = require("jsonwebtoken");
const scrkey = "viratsaini@9917";


const fetchuser = (req,res,next) =>{
    //get user user from the jwd token and add id to req object 
    const token=req.header("auth-token")
    if(!token){
        res.status(401).send({Error:"Please authenticate useing valid token"})
    }
    try {
        const data=jwt.verify(token,scrkey)
        //save user detail in user by data(having user id) and send it 
            req.user =data.user;
            next();

    } catch (error) {
        res.status(401).send({Error:"Please authenticate useing valid token"});
    }
};
module.exports=fetchuser;