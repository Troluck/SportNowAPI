const db = require("../config/db");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  time: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const ExerciseModel = db.model("exercise", exerciseSchema);

module.exports = ExerciseModel;
