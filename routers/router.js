const router = require("express").Router();
const UserController = require("../controller/user.controller");
const ExerciseController = require("../controller/exercise.controller");

router.post("/registration", UserController.register);
router.post("/login", UserController.login);
router.post("/createExercise", ExerciseController.create);
router.post(
  "/:userId/exercises/:exerciseId",
  ExerciseController.addUserExercise
);
router.post(
  "/:userId/exercisesHistory/:exerciseId",
  ExerciseController.addExercisesHistory
);
router.get("/findAllExercise", ExerciseController.findAll);
router.get("/findOneExercise/:id", ExerciseController.findOne);
router.get("/:userId/exercises", ExerciseController.getUserExercises);
router.get("/:userId/exercisesHistory", ExerciseController.getExercisesHistory);

router.delete(
  "/:userId/exercises/:exerciseId",
  ExerciseController.deleteUserExercise
);

module.exports = router;
