const { ExtractJwt } = require('passport-jwt'); 
require('dotenv').config() 

module.exports = { 
    options: { 
        secretOrKey: process.env.JWT_ACCESS_SECRET,  
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    }
}