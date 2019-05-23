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

  async confirmEmail(req, res) {
    const { token } = req.params;
    console.log(token);
    const user = await User.findOne({ activeAcountToken: token });
    user.isUserActive = true;
    await user.save();
    return res.status(200).json({
      data: {
        user: user.username,
        email: user.email,
        activated: user.isUserActive
      }
    });
  }
}

module.exports = new UserController();
