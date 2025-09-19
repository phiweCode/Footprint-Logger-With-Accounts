const { userLoginController, createUserController, logoutController, refreshTokenController } = require('../controllers/userControllers'); 
const express = require('express'); 
const router = express.Router(); 
const passport = require('../auth/auth');
router.post('/sign_in', userLoginController); 
router.post('/sign_up', createUserController); 
router.post('/sign_out', logoutController); 
router.get('/check', passport.authenticate('jwt', {session: false}), function(req,res){ 
    console.log(req.user)
    res.status(200).json({data: req.user})
})
router.post('/refresh', refreshTokenController )


module.exports = router; 