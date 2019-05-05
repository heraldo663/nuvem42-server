/* eslint-disable class-methods-use-this */
const User = require("../models/User");

class ActiveUserController {
  async store(req, res) {
    const { token } = req.body;

    console.log(req.user);

    return res.send("ok");
  }
}

module.exports = new ActiveUserController();
