const path = require("path");
const nodemailer = require("nodemailer");
const expHbs = require("express-handlebars");
const mailHbs = require("nodemailer-express-handlebars");
const mailgunTransport = require("nodemailer-mailgun-transport");

const config = require("../../config");

let trasnport;

if (process.env.NODE_ENV === "production") {
  trasnport = mailgunTransport(config.mailgun);
} else {
  trasnport = nodemailer.createTransport(config.mail);
}

const viewPath = path.resolve(__dirname, "..", "views", "emails");

trasnport.use(
  "compile",
  mailHbs({
    viewEngine: expHbs.create({
      partialsDir: path.resolve(viewPath, "partials")
    }),
    viewPath,
    extName: ".hbs"
  })
);

module.exports = trasnport;
