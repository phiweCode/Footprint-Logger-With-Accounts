const { userLoginController, createUserController, logoutController } = require('../controllers/userControllers'); 
const express = require('express'); 
const router = express.Router()

router.post('/login', userLoginController); 
router.post('/sign_up', createUserController); 
router.post('/sign_out', logoutController); 

module.exports = router; 