const User = require("../app/models/User");
const config = require("../config");
const mongoose = require("mongoose");

async function saveSuperUser(user) {
  try {
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: user.password,
      isUserActive: true,
      isSuperUser: true
    }).save();

    return await newUser;

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

async function createSuperUser(args = process.argv, saveSuperUser) {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV == "test") {
    mongoose.connect(config.database.uri + "_test", {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  } else {
    mongoose.connect(config.database.uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  }

  const user = {
    username: args[2],
    email: args[3],
    password: args[4]
  };

  await saveSuperUser(user);

  mongoose.connection.close();
}

if (process.argv[5] == "exec") createSuperUser(process.argv, saveSuperUser);

module.exports = {
  saveSuperUser,
  createSuperUser
};
