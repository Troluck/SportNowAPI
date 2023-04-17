const ExerciseService = require("../services/exercise.services");

exports.create = async (req, res, next) => {
  try {
    const { title, time, description } = req.body;
    const successRes = await ExerciseService.createExercise(
      title,
      time,
      description
    );

    res.json({ status: true, success: "Exercise successfully created" });
  } catch (error) {
    throw error;
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const exercises = await ExerciseService.findAllExercises();

    res.json({ status: true, data: exercises });
  } catch (error) {
    throw error;
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const exercise = await ExerciseService.findOneExercise(req.params.id);

    res.json({ status: true, data: exercise });
  } catch (error) {
    throw error;
  }
};

exports.addUserExercise = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { exerciseId } = req.params;

    const successRes = await ExerciseService.addExerciseToUser(
      userId,
      exerciseId
    );

    res.json({ status: true, success: "User exercise added successfully" });
  } catch (error) {
    throw error;
  }
};
exports.getUserExercises = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userExercises = await ExerciseService.getUserExercises(userId);

    res.json({ status: true, data: userExercises });
  } catch (error) {
    throw error;
  }
};
exports.deleteUserExercise = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { exerciseId } = req.params;
    console.log("UserId:", userId);
    const userExercises = await ExerciseService.deleteUserExercise(
      userId,
      exerciseId
    );

    res.json({ status: true, data: userExercises });
  } catch (error) {
    throw error;
  }
};

exports.addExercisesHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { exerciseId } = req.params;

    const successRes = await ExerciseService.addExerciseHistory(
      userId,
      exerciseId
    );

    res.json({
      status: true,
      success: "User exercise added successfully to History",
    });
  } catch (error) {
    throw error;
  }
};
exports.getExercisesHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const exercisesHistory = await ExerciseService.getExercisesHistory(userId);

    res.json({ status: true, data: exercisesHistory });
  } catch (error) {
    throw error;
  }
};
