const express = require('express'); 
const passport = require('../auth/auth'); 
const { userLogController, getUserLogsController, getDashboardDataController} = require('../controllers/userLogsControllers')

const router = express.Router(); 

router.post('/activity_log', passport.authenticate('jwt', {session: false}) , userLogController); 
router.post('/user_logs', passport.authenticate('jwt', {session: false}) , getUserLogsController); 
router.post('/dashboard', passport.authenticate('jwt', {session: false}) , getDashboardDataController); 

module.exports = router; 