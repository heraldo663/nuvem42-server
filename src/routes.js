const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");

const sessionValidator = require("./app/validators/Session");
const userValidator = require("./app/validators/User");

const UserController = require("./app/controller/auth/UserController");
const SessionController = require("./app/controller/auth/SessionController");

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
routes.post("/users", validate(userValidator), handle(UserController.store));
routes.post(
  "/sessions",
  validate(sessionValidator),
  handle(SessionController.store)
);

module.exports = routes;
