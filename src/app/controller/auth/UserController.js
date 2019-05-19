const authService = require("../../services/Auth");
const User = require("../../models/User");
class UserController {
  async store(req, res) {
    const user = await User.find({ email: req.body.email });

    if (user.length !== 0) {
      return res.status(400).json({
        errors: {
          msg: "Email already registered!"
        }
      });
    } else {
      const newUser = await authService.createUser(req.body);
      await authService.createBaseDirs;
      return res.status(201).json({
        data: {
          _id: newUser._id,
          email: newUser.email,
          username: newUser.username
        }
      });
    }
  }
}

module.exports = new UserController();
