const express = require('express'); 
const authenticate = require('../auth/authMiddleware'); 
const { userLogController, getUserLogsController, getDashboardDataController} = require('../controllers/userLogsControllers')

const router = express.Router(); 

router.get('/activity_log', authenticate , userLogController); 
router.get('/user_logs', authenticate , getUserLogsController); 
router.get('/dashboard', authenticate , getDashboardDataController); 

module.exports = router; 