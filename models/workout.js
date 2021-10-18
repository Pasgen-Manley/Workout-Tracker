const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter exercise name."
  },
  type: {
    type: String,
    trim: true,
    required: "Please enter exercise type."
  },
  weight: {
    type: Number,
    required: "Please enter exercise weight."
  },
  sets: {
    type: Number,
    required: "Please enter how many sets were completed."
  },
  reps: {
    type: Number,
    required: "Please enter how mant reps were completed in each set."
  },
  duration: {
    type: Number,
    required: "Please enter the duration of the workout"
  },
});

const workoutSchema = new Schema({
  day: {
    type: Date,
    required: "Please enter date of workout",
    default: Date.now,
  },
  exercises: {
    type: [exerciseSchema],
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;