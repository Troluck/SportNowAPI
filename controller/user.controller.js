const UserService = require("../services/user.service");

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await UserService.checkuser(email);
    if (userExists) {
      return res.status(416).json({
        status: false,
        error: "L'utilisateur existe déja",
      });
    }

    if (
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    ) {
      return res.status(417).json({
        status: false,
        error:
          "Le mot de passe doit contenir au moins un chiffre, une majuscule, un caractère spécial et être composé d'au moins 8 caractères.",
      });
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return res.status(418).json({
        status: false,
        error: "Le mot de passe n'est pas conforme.",
      });
    }
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
      return res
        .status(401)
        .json({ status: false, error: "Adresse e-mail incorrect" });
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch === false) {
      return res
        .status(401)
        .json({ status: false, error: "Mot de passe incorrect" });
    }

    let tokenData = { _id: user._id, email: user.email };

    const token = await UserService.generateToken(tokenData, "secretKey", "1h");

    res.status(200).json({ status: true, token: token });
    return isMatch;
  } catch (error) {
    throw error;
  }
};
