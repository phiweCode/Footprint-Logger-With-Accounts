const { GHGLogsModel } = require("../models/userSchema");
const mongoose = require('mongoose')

const createLog = async ({ logDetails }) => {
  try {
    const response = await GHGLogsModel.create(logDetails);
    if (response) return response;

  } catch (error) {
    throw Error(error.message)
  }
};

const getUserLogs = async ({ userId }) => {
  try {
    //const response = await UserModel.findById(userId).populate('logs').exec(); 
    const response = await GHGLogsModel.find({ user: userId });
    if (response) return response;
    return null;
  } catch (error) {
    throw Error(error.message)
  }
}

const getAggregatedLogs = async ({ userId }) => {
  const id = new mongoose.Types.ObjectId(userId);

  try {
    const [result] = await GHGLogsModel.aggregate([
      {
        $facet: {
          currentUser: [
            { $match: { user: id } },
            {
              $group: {
                _id: null,
                runningTotal: { $sum: "$estimatedContribution" },
                averageContribution: { $avg: "$estimatedContribution" }
              }
            }
          ],
          community: [
            { $match: { user: { $ne: id } } },
            {
              $group: {
                _id: null,
                runningTotal: { $sum: "$estimatedContribution" }
              }
            }
          ]
        }
      },
      {
        $project: {
          runningTotal: { $first: "$currentUser.runningTotal" },
          averageContribution: { $first: "$currentUser.averageContribution" },
          ratioAgainstCommunity: {
            $cond: [
              { $eq: [{ $first: "$community.runningTotal" }, 0] },
              0,
              {
                $divide: [
                  { $first: "$currentUser.runningTotal" },
                  { $first: "$community.runningTotal" }
                ]
              }
            ]
          }
        }
      }
    ]);

    console.log(result, "from service")
    return result;
  } catch (error) {
    throw Error(error.message)
  }

};

const getActivityTotalPerCategory = async ({ userId }) => {
  try {
    const result = await GHGLogsModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {

          details: [
            {
              $group: {
                _id: { category: "$category", activity: "$mode" },
                quantity: { $sum: "$estimatedContribution" }
              }
            },
            {
              $project: {
                _id: 0,
                category: "$_id.category",
                activity: "$_id.activity",
                quantity: 1
              }
            }
          ],

          grandTotal: [
            { $group: { _id: null, runningTotal: { $sum: "$estimatedContribution" } } },
            { $project: { _id: 0, runningTotal: 1 } }
          ]
        }
      }
    ]);

    return result;

  } catch (error) {
    throw Error(error.message)
  }
}

const getWeeklyActivities = async ({ userId }) => {
  try {
    const lastWeekActivities = new Date();
    lastWeekActivities.setDate(lastWeekActivities.getDate() - 7);

    const results = await GHGLogsModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: {
            $gte: lastWeekActivities
          }
        }
      }, {
        $project: {
          estimatedContribution: 1,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        }
      }, {
        $group: {
          _id: "$date",
          totalQuantity: {
            $sum: "$estimatedContribution"
          }
        }
      }
    ]);

    return results;

  } catch (error) {
    throw Error(error.message)
  }
} 

const generateLeaderboard = async () => { 
    
   const pipeline = [
      {
        $group: {
          _id: "$user",
          totalEmissions: { $sum: "$estimatedContribution" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          totalEmissions: 1
        }
      },
      {
        $setWindowFields: {
          sortBy: { totalEmissions: 1 },
          output: {
            rank: { $rank: {} }
          }
        }
      }
    ];

  try {
     const rankedResults = await GHGLogsModel.aggregate(pipeline) 
     return rankedResults; 

  } catch (error) {
    throw Error(error.message)
  }
}

module.exports = {
  createLog,
  getUserLogs,
  getAggregatedLogs,
  getActivityTotalPerCategory,
  getWeeklyActivities, 
  generateLeaderboard
}