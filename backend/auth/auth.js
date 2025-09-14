const passport = require('passport'); 
const JWTStrategy = require('passport-jwt').Strategy;  
const { options }= require('../config'); 
const { UserModel } = require('../models/userSchema')

passport.use(new JWTStrategy(options, async(jwtPayload, done)=>{ 
    try {
        const user = await UserModel.find({id: jwtPayload.sub}) 

        if(!user) return done(null, false)
        return done(null, user); 

    } catch (error) {
        return done(error, false); 
    }
})) 

module.exports = passport