const UserService = require("../services/user.service");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const successRes = await UserService.registerUser(email, password);

    res.json({ status: true, success: "User successfully registered" });
  } catch (error) {
    throw error;
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.checkuser(email);

    if (!user) {
      throw new Error("ce mail n'existe pas");
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch === false) {
      throw new Error("Mot de passe invalide");
    }

    let tokenData = { _id: user._id, email: user.email };

    const token = await UserService.generateToken(tokenData, "secretKey", "1h");

    res.status(200).json({ status: true, token: token });
    return isMatch;
  } catch (error) {
    throw error;
  }
};
