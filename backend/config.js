require("dotenv").config();
require("dotenv").config();
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieExtractor = async (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies["jwt"]; 
    return token
};

module.exports = {
  options: {
    secretOrKey: process.env.JWT_ACCESS_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
};
