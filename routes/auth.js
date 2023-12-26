//defining the process of authentication of user.
const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const scrkey = "viratsaini@9917"

//create a user: using "/api/auth/createuser". NO login requir
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").notEmpty().isEmail(),
    body("password", "passoword must be atleast five character").isLength({min: 3,}),
  ],

//if there is error return bad request and the errors
  async (req, res) => {
    //check that the given userid password and email are correct according to defined rule and give error if not
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
//make salt and add salt with password and hash it and make safe password
    const salt= await bcrypt.genSalt(10);
    const safepass=await bcrypt.hash(req.body.password,salt);

//check wather the user email is arlady exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ Error: "this email is arlady exist" });
      }

//if email is not arlady exists make the user       
      user = await User.create({
        name: req.body.name,
        password: safepass,
        email: req.body.email,
      });
// make data and token using jwt and pass to user
      const data ={
        user:{
           id: user.id}
          };
      const token = jwt.sign(data, scrkey);
      res.json({token});
    } 
    catch (error) { console.error(error.message);
    res.status  (500).send("some error accurs")}
  }
);
module.exports = router;
