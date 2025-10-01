const { UserModel, GHGLogsModel } = require("../models/userSchema");

const getUsers = async () => {
  try {
    const users = await UserModel.find({});

    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

const checkIfUserExists = async ({ email }) => await UserModel.exists({ email });

const getUser = async ({userId, email }) => {
  try {
    const user = await UserModel.findOne({$or: [
      {_id: userId}, { 
        email: email
      }
    ]})

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

module.exports = {
  getUser,
  getUsers,
  getGHGLogs,
  createUser,
  checkIfUserExists
};
