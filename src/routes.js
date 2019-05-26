const express = require("express");
const validate = require("express-validation");
const handle = require("express-async-handler");
const passport = require("passport");
const multer = require("multer");

const sessionValidator = require("./app/validators/Session");
const userValidator = require("./app/validators/User");
const dirValidator = require("./app/validators/Dir");

const UserController = require("./app/controller/auth/UserController");
const SessionController = require("./app/controller/auth/SessionController");
const DirController = require("./app/controller/DirController");
const AssetController = require("./app/controller/AssetController");

const storage = require("./app/services/Storage");

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
routes.get("/users/:token", handle(UserController.confirmEmail));
routes.post(
  "/sessions",
  validate(sessionValidator),
  handle(SessionController.store)
);

/**
 * Assets routes
 */

const upload = multer(storage);

routes.get(
  "/assets",
  passport.authenticate("jwt", { session: false }),
  handle(AssetController.index)
);
routes.get(
  "/assets/:id",
  passport.authenticate("jwt", { session: false }),
  handle(AssetController.show)
);
routes.post(
  "/assets",
  passport.authenticate("jwt", { session: false }),
  upload.single("file"),
  handle(AssetController.store)
);
routes.put(
  "/assets/:id",
  passport.authenticate("jwt", { session: false }),
  handle(AssetController.update)
);
routes.delete(
  "/assets/:id",
  passport.authenticate("jwt", { session: false }),
  handle(AssetController.delete)
);

/**
 * Dirs routes
 */

routes.get(
  "/dirs",
  passport.authenticate("jwt", { session: false }),
  handle(DirController.index)
);
routes.get(
  "/dirs/:id",
  passport.authenticate("jwt", { session: false }),
  handle(DirController.show)
);
routes.post(
  "/dirs",
  passport.authenticate("jwt", { session: false }),
  validate(dirValidator),
  handle(DirController.store)
);
routes.put(
  "/dirs/:id",
  passport.authenticate("jwt", { session: false }),
  validate(dirValidator),
  handle(DirController.update)
);
routes.delete(
  "/dirs/:id",
  passport.authenticate("jwt", { session: false }),
  handle(DirController.delete)
);

module.exports = routes;
