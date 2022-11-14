const router = require("express").Router();
const User = require("../model/User");
const Joi = require("@hapi/joi");
const userValidate = require("./validate/uservalidate");
const bcrypt = require("bcryptjs");
const validLogin = require("../route/passValidate");
const jwt=require('jsonwebtoken')
router.get("/list", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/list/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) res.json(user);
  else res.json({ message: "There's no matching user" });
});

router.post("/reg", async (req, res) => {
    const user=await User.findOne({email:req.body.email})
    if(!user) res.status(403).end("Email does not exist")
    
    const pass=await bcrypt.compare(req.body.password,user.password)
    if(!pass) res.json({message:"invalid password"})
   const token= jwt.sign({_id:user._id},process.env.SECURITY_PASS)
    res.header('auth',token).send(token)
    // res.json({user:user._id, message:"User loggin successfully"} )

});

router.post("/register", async (req, res) => {
  // const err=schema.validate(req.body)
  //     if(err.error) res.json({"message":"There is an error"})

  const salt = await bcrypt.genSaltSync(10);
  const hashed = await bcrypt.hashSync(req.body.password, salt);

  const email = await User.findOne({ email: req.body.email });
  if (email) res.status(403).send("Email already exist");

  const err = userValidate(req.body);
  if (err.error) {
    console.log(err.message);
  }

  const user = new User({
    name: req.body.name,
    password: hashed.toString(),
    email: req.body.email,
  });
  try {
    await user.save();
    if (user)
      res.json({ User: user.id, message: "has been recorded successfully" });
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
