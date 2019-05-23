const kue = require("kue");
const Sentry = require("@sentry/node");
const EmailValidation = require("../jobs/EmailValidation");
const config = require("../../config");

const Queue = kue.createQueue({
  redis: config.redis
});

Queue.process(EmailValidation.key, EmailValidation.handle);

Queue.on("error", Sentry.captureException);

module.exports = Queue;
