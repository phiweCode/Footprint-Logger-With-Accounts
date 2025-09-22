const { userLoginController, createUserController, logoutController, refreshTokenController } = require('../controllers/userControllers'); 
const express = require('express'); 
const router = express.Router(); 
const authenticate = require('../auth/authMiddleware');
router.post('/sign_in', userLoginController); 
router.post('/sign_up', createUserController); 
router.post('/sign_out', logoutController); 
router.get('/check', authenticate, function(req,res){ 
    console.log(req?.user)
    res.json({ok: true})
})
router.get('/refresh', refreshTokenController )


module.exports = router; 