const dotenv = require("dotenv");
const {
  createLog,
  getUserLogs,
  getAggregatedLogs,
  getActivityTotalPerCategory,
  getWeeklyActivities,
} = require("../services/logsService");

dotenv.config({
  path: __dirname + "/../.env",
});

const userLogController = async (req, res) => {
  try {
    const { userId, category, mode, quantity } = req.body;

    if (!userId || !category || !mode || !quantity)
      return res.status(400).json({
        message: "Please provide all required fields.",
      });

    const logDetails = {
      user: userId,
      category,
      mode,
      estimatedContribution: quantity,
    };

    const response = await createLog({ logDetails });

    return res.status(201).json({
      message: "Your activity was logged successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error" + error.message,
    });
  }
};

const getUserLogsController = async (req, res) => {
  try {
    const { userId } = req.body;
    const userLogs = await getUserLogs({ userId });

    if (!userLogs)
      return res.status(404).json({
        message: "User logs could not be found.",
      });

    return res.status(200).json({
      message: "Retrieved logs successfully",
      data: userLogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getDashboardDataController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({
        message: "Please provide the user id to get user data.",
      });

    const stats = await getAggregatedLogs({ userId }); 
    const activityTotalsPerCategory = await getActivityTotalPerCategory({ userId }); 
    const lastWeekActivities = await getWeeklyActivities({userId}) 

    const response = { stats, activityTotalsPerCategory, lastWeekActivities}

    console.log(response);
    return res.status(200).json({
      message: "Retrieved successfully.",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error" + error.message,
    });
  }
};

module.exports = {
  userLogController,
  getUserLogsController,
  getDashboardDataController,
};
