/* eslint-disable class-methods-use-this */
const User = require("../../models/User");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).json({
        errors: {
          msg: "User not found"
        }
      });

    if (!(await user.compareHash(password))) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (user.isUserActive) {
      return res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: User.generateToken(user),
        refreshToken: User.generateRefreshToken(user)
      });
    } else {
      return res.json({
        email: user.email,
        token: User.generateToken(user),
        alert: {
          msg: "Confirm your email"
        }
      });
    }
  }
}

module.exports = new SessionController();
