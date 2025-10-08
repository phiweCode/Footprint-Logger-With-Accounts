const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: __dirname + '../.env'
});

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer '))
        return res.status(401).json({
            message: "Missing or invalid Authorization header."
        })

    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
            message: "Invalid or expired token."
        })
        req.user = decoded.sub; 
        next();
    });
}

module.exports = authenticate; 
