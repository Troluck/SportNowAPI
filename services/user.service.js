const UserModel = require("../model/user.model");
const ExerciseModel = require("../model/exercise.model");
const jwt = require("jsonwebtoken");

class UserService {
  static async registerUser(email, password) {
    try {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\s]){8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error(
          "Le mot de passe doit contenir au moins 8 caractères, dont au moins un chiffre, une majuscule, un caractère spécial"
        );
      }
      const createUser = new UserModel({ email, password });
      return await createUser.save();
    } catch (error) {
      throw error;
    }
  }

  static async checkuser(email) {
    try {
      const user = await UserModel.findOne({ email });

      return user || null;
    } catch (error) {
      throw error;
    }
  }

  static async generateToken(tokenData, secretKey, jwt_expire) {
    return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
  }
}

module.exports = UserService;
