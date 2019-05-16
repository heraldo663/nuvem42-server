const User = require("../models/User");

module.exports = async (req, res, next) => {
  const users = await User.find({});

  if (users.length === 0) {
    res.locals.isFirstUser = true;
    next();
  } else {
    res.locals.isFirstUser = false;
    next();
  }
};
