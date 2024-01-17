//defining the process of authentication of user.
const express = require("express");
const User = require("../Models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const scrkey = "viratsaini@9917";
const fetchuser = require("../middleware/fetchuseer")

//route 1:create a user: using "/api/auth/createuser". NO login requir =="sign up"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").notEmpty().isEmail(),
    body("password", "passoword must be atleast five character").isLength({
      min: 3,
    }),
  ],

  //if there is error return bad request and the errors
  async (req, res) => {
    //check that the given userid password and email are correct according to defined rule and give error if not
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    }
    //make salt and add salt with password and hash it and make safe password
    const salt = await bcrypt.genSalt(10);
    const safepass = await bcrypt.hash(req.body.password, salt);

    //check wather the user email is arlady exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json({ Error: "this email is arlady exist" });
      }

      //if email is not arlady exists make the user
      user = await User.create({
        name: req.body.name,
        password: safepass,
        email: req.body.email,
      });
      // make data and token using jwt and pass to user
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, scrkey);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error accurs");
    }
  }
);

// route 2: authenticate  a user: using "/api/auth/login". NO login requir =="login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").notEmpty().isEmail(),
    body("password", "passoword cannot be blank").notEmpty(),
  ],
  //if there is error return bad request and the errors
  async (req, res) => {
    //check that the given userid password and email are correct according to defined rule and give error if not
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      //check user and password/
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ Error: "Wrong email or password" });
      }
      const passowordcheck = await bcrypt.compare(password, user.password);
      if (!passowordcheck) {
        return res.status(404).send({ Error: "Wrongnjn email or password" });
      }

      //send data and token to user .
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, scrkey);
      res.send({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//route 3: login user detail using Post "/api/auth/getuser"
router.post( "/getuser",fetchuser,async (req, res) => {
    try{
        userid=req.user.id;
        const user=await User.findById(userid).select("-password")
       res.send(user);
  }catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
