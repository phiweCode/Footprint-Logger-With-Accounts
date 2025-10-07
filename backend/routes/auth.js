const { userLoginController, createUserController, logoutController, refreshTokenController, getUserProfileDetails, updateOrCreateGoalController, getUserGoalController } = require('../controllers/userControllers'); 
const express = require('express'); 
const router = express.Router(); 
const authenticate = require('../auth/authMiddleware');
const { getLeaderboardData } = require('../controllers/userLogsControllers');
const { getUserGoal } = require('../services/userServices');

router.post('/sign_in', userLoginController); 
router.post('/sign_up', createUserController); 
router.post('/sign_out', logoutController); 
router.get('/check', authenticate, function(req,res){ 
    console.log(req?.user)
    res.json({ok: true})
})
router.get('/refresh', refreshTokenController ); 
router.get('/profile', authenticate, getUserProfileDetails); 
router.get('/leaderboard', authenticate, getLeaderboardData); 
router.post('/update_goal', authenticate, updateOrCreateGoalController ) 
router.get('/goal', authenticate, getUserGoalController)


module.exports = router; 