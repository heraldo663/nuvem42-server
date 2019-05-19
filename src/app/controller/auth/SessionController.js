/* eslint-disable class-methods-use-this */
const User = require("../../models/User");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ errors: [{ message: "Email not found" }] });

    if (!(await user.compareHash(password))) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid password" }] });
    }
    if (user.isUserActive) {
      return res.json({
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          token: User.generateToken(user),
          refreshToken: User.generateRefreshToken(user)
        }
      });
    } else {
      return res.json({ errors: [{ message: "Email not confirmed" }] });
    }
  }
}

module.exports = new SessionController();
