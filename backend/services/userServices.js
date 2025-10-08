const { UserModel, GHGLogsModel, GoalsModel } = require("../models/userSchema");

const getUsers = async () => {
  try {
    const users = await UserModel.find({});

    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

const checkIfUserExists = async ({ email }) => await UserModel.exists({ email });

const getUser = async ({ userId, email }) => {
  try {
    const user = await UserModel.findOne({
      $or: [
        { _id: userId },
        { email: email }
      ]
    })

    return user;
  } catch (error) {
    throw Error(error.message);
  }
};

const getGHGLogs = async () => {
  try {
    const logs = await GHGLogsModel.find();

    if (!logs)
      return {
        message: "There are currently no logs in the database.",
      };

    return logs;
  } catch (error) {
    throw Error(error.message);
  }
};

const createUser = async ({ newUser }) => {
  try {

    return await UserModel.create(newUser);
  } catch (error) {
    throw Error(error.message)
  }
}


const createGoal = async ({ userId, goal }) => {
  try {
    const newGoal = await UserModel.updateOne({ _id: userId }, {
      $push: {
        goals: {
          weeklyLimitGoal: goal
        }
      }
    }, { new: true, upsert: true })

    return updateOrCreateGoal;

  } catch (error) {
    throw Error(error.message)

  }
};


const updateOrCreateGoal = async ({ userId, goal }) => {
  try {
    const currentTime = Date.now();
    const oneWeekLater = currentTime + 7 * 24 * 60 * 60 * 1000;

    const userDoc = await GoalsModel.findOneAndUpdate(
      {
        user: userId,
        endsAt: { $gte: currentTime, $lte: oneWeekLater },
      },
      { $set: { weeklyLimitGoal: goal } },
      { new: true }
    ); 

    if(userDoc) console.log("Existing goal found, updating the goal.");
    if(!userDoc) console.log("No existing goal found, creating a new one.");

    if (!userDoc) {
      return await GoalsModel.insertOne(
        { user: userId,
        weeklyLimitGoal: goal ,
        endsAt: oneWeekLater },
        { new: true }
      );
    }

    return userDoc;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserGoal = async (userId) => {
  const currentTime = Date.now();
  const oneWeekLater = currentTime + 7 * 24 * 60 * 60 * 1000;

  try {
    const userGoal = await GoalsModel.find({
      user: userId,
      endsAt: {
        $gte: currentTime, $lte: oneWeekLater
      }
    }) 

    console.log("User goal from service", userGoal);
    return userGoal
  } catch (error) {
    throw new Error(`${error.message}`)
  }}
; 

const deleteUserGoal = async ({ userId , goalId }) => { 
  try {
    const deletedGoal = await GoalsModel.deleteOne({ user: userId , 
      _id: goalId,
     }); 

    return deletedGoal;
  } catch (error) {
    throw Error(error.message)
  }

}

module.exports = {
  getUser,
  getUsers,
  getGHGLogs,
  createUser,
  checkIfUserExists,
  createGoal,
  updateOrCreateGoal,
  getUserGoal, 
  deleteUserGoal
}
