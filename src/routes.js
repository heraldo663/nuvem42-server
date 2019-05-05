const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");

const controllers = require("./app/controller");
const validators = require("./app/validators");

const routes = express.Router();

/**
 * Root route
 */
routes.get("/", (req, res) => {
  res.send("Server online");
});
/**
 * Register, Login Routes
 */
routes.post(
  "/users",
  validate(validators.User),
  handle(controllers.UserController.store)
);
routes.post(
  "/sessions",
  validate(validators.Session),
  handle(controllers.SessionController.store)
);

module.exports = routes;
