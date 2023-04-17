const ExerciseModel = require("../model/exercise.model");
const UserModel = require("../model/user.model");

class ExerciseService {
  static async createExercise(title, time, description) {
    try {
      const createExercise = new ExerciseModel({ title, time, description });
      return await createExercise.save();
    } catch (error) {
      throw error;
    }
  }
  static async findAllExercises() {
    try {
      const exercises = await ExerciseModel.find({});
      return exercises;
    } catch (error) {
      throw error;
    }
  }
  static async findOneExercise(id) {
    try {
      const exercises = await ExerciseModel.findById(id);
      return exercises;
    } catch (error) {
      throw error;
    }
  }

  static async addExerciseToUser(userId, exerciseId) {
    try {
      const exercise = await ExerciseModel.findById(exerciseId);
      if (!exercise) throw new Error("Exercise not found");

      const user = await UserModel.findById(userId);
      if (!user) throw new Error("User not found");

      user.exercises.push(exercise);

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getUserExercises(userId) {
    try {
      const user = await UserModel.findById(userId).populate("exercises");
      if (!user || !user.exercises) {
        throw new Error("User exercises not found");
      }
      return user.exercises;
    } catch (error) {
      throw error;
    }
  }
  static async deleteUserExercise(userId, exerciseId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const exerciseIndex = user.exercises.indexOf(exerciseId);
      if (exerciseIndex === -1) {
        throw new Error("Exercise not found for this user");
      }
      user.exercises.splice(exerciseIndex, 1);
      await user.save();
      return user.exercises;
    } catch (error) {
      throw error;
    }
  }
  static async addExerciseHistory(userId, exerciseId) {
    try {
      const exercise = await ExerciseModel.findById(exerciseId);
      if (!exercise) throw new Error("Exercise not found");

      const user = await UserModel.findById(userId);
      if (!user) throw new Error("User not found");
      const exerciseWithDate = { exercise, date: Date.now() };
      user.exercisesHistory.push(exerciseWithDate);

      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }
  static async getExercisesHistory(userId) {
    try {
      const user = await UserModel.findById(userId).populate({
        path: "exercisesHistory.exercise",
        model: "exercise",
      });
      if (!user) {
        throw new Error("User exercises not found");
      }
      const exercisesHistory = user.exercisesHistory.map((entry) => ({
        exercise: entry.exercise,
        date: entry.date,
      }));
      return exercisesHistory;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ExerciseService;
