const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { fullname,username, email, password } = req.body;
  const newUser = new User({
    fullname,
    username,
    email,
    password,
  });
  const existedUser=await User.findOne({email});
  try{
    if(existedUser){
        return res.status(400).json('user already registered..')
    }
    else{
        const salt=await bcrypt.genSalt(12)
        newUser.password=await bcrypt.hash(newUser.password,salt)
        const user=await newUser.save()
        res.status(200).json('user registered')
        console.log(user)

    }
  }catch{
      return res.status(400).json('something went wrong')
  }
});

module.exports = router;
