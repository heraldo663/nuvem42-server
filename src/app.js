require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const validate = require("express-validation");
const Youch = require("youch");
const Sentry = require("@sentry/node");
const passport = require("passport");

const config = require("./config");

class App {
  constructor() {
    this.express = express();
    this.sentry();
    this.auth();
    this.middleweares();
    this.database();
    this.staticFiles();
    this.routes();
    this.exception();
  }

  sentry() {
    Sentry.init({
      dsn: config.sentry.dsn
    });
  }

  auth() {
    this.express.use(passport.initialize());
    require("./app/services/passport-jwt")(passport);
  }

  middleweares() {
    this.express.use(Sentry.Handlers.requestHandler());
    this.express.use(express.json());
    this.express.use(logger("dev"));
    this.express.use(helmet());
    this.express.use(cors());
  }

  database() {
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
  }

  routes() {
    this.express.use(require("./routes"));
  }

  staticFiles() {
    this.express.use(
      "/media",
      passport.authenticate("jwt", { session: false }),
      express.static(config.storage.baseDir)
    );
  }

  exception() {
    if (process.env.NODE_ENV !== "production")
      this.express.use(Sentry.Handlers.errorHandler());

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err);
      }

      if (process.env.NODE_ENV !== "production") {
        const youch = new Youch(err, req);

        return res.status(500).send(await youch.toHTML());
      }

      return res
        .status(err.status || 500)
        .json({ error: "Internal Server Error" });
    });
  }
}

module.exports = new App().express;
