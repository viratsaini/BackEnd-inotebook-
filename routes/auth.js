const express=require("express");
const User = require("../Models/User");
const router=express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").notEmpty().isEmail(),
    body('password',"passoword must be atleast five character").isLength({min :3})
    ],(req,res)=>{
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
    User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
    }).then(user=>res.json(user))
    .catch(err=>{console.log(err)
        res.json({erroe:"This email is already added",message:err.message})})
})

module.exports=router