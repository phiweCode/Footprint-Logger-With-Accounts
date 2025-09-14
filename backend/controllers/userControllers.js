const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { UserModel } = require('../models/userSchema');
const { getUser, createUser, checkIfUserExists } = require('../services/userServices');
const dotenv = require('dotenv');


dotenv.config({
  path: __dirname + "/../.env"
});


//Login controller and utility functions
const signAccessToken = (user) => jwt.sign({ sub: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
const signRefreshToken = (user) => jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Your authentication credentials were not provided."
      });
    }

    const user = await getUser({email})
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", accessToken, {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ message: "Logged in" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error"});
  }
};

//Sign up controller 
const createUserController = async (req, res) => {
  try {
      const { firstName, lastName, email, password } = req.body;  

      if(!firstName || !lastName || !password || !email)
       return  res.status(400).json({ 
          message: "Please provide all the required fields."
        })  
      
      
      if(await checkIfUserExists({email}))
       return  res.status(400).json({ 
          message: "The email provided already exists. Please use a different email."
      }) 

      const hashedPassword = await bcrypt.hash(password, 10); 

      const newUser = { 
        firstName, 
        lastName, 
        email, 
        password: hashedPassword 
      }

      const user = await createUser({newUser})

      console.log(user)

     return res.status(201).json({ 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email
      })


  } catch (error) {
   return res.status(500).json({ 
      message: "Server error",
      error: error.message
    })
  }
}; 

//logout 
const logoutController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh;
    if (!refreshToken) return res.status(204).send(); 

    const user = await UserModel.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.cookie('refresh', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV = "production", 
      sameSite: 'none',
      path: '/',
      expires: new Date(0)
    });

    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV = "production", 
      sameSite: 'none',
      path: '/',
      expires: new Date(0)
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = {
  userLoginController, 
  createUserController, 
  logoutController
}
