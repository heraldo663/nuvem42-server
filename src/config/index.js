require("dotenv").config();
module.exports = {
  auth: require("./auth"),
  database: require("./database"),
  mail: require("./mail"),
  mailgun: require("./mailgun"),
  redis: require("./redis"),
  sentry: require("./sentry"),
  storage: require("./storage")
};
