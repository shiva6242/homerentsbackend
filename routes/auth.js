const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/UserSchema");
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!fyfhfyff", error: err.message });
  }
});

router.post("/signin",async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, user })

    } else {
      const newUser = new User({
        firstName:req.body.firstName,
        email:req.body.email,
        profileImagePath:req.body.profileImage,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      console.log(savedUser)
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
     res.status(200).json({ token, user:savedUser })

    }
  } catch (err) {
    console.log(err)
  }
});


router.post('/login',async(req,res)=>{
   const {email,password}=req.body
   try {
      const user=await User.findOne({email})
   if(!user)
   {
      return res.status(400).json({msg:"you have not registered please register first... "})
   }
   const isMatch=await bcrypt.compare(password,user.password)
   if(!isMatch)
   {
      return res.status(400).json({msg:"incorrect password "})
   }
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  delete user.password
   
    res.status(200).json({ token, user })
   
   } catch (err) {
      res.status(500).json({ error: err.message })

   }
})
module.exports = router
