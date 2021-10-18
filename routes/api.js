const router = require('express').Router();
const Workout = require('../models/workout.js');

//Gets last workout
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([{
    "$addFields": {
      "totalDuration": {
        "$sum": "$exercises.duration"
      }
    }
  }])
    .then((result) => {
      res.json(result)
  })
  .catch((err) => {
    res.status(400).json(err);
  })
});

//Gets workouts in 7 day range
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([{
    "$sort" : { day : -1 }
  },
  {
    "$limit" : 7
  },
  {
    "$addFields": {
      "totalDuration": {
        "$sum": "$exercise.duration"
      }
    }
  }]).then((result) => {
    res.json(result)
  })
});

//Add an exercise
router.put("/api/workouts/:id", function(req, res){
  Workout.findByIdAndUpdate(req.params.id, {
    "$push": {
      "exercises": req.body
    }
  }, {new: true})
  .then((updated) => {
    res.json(updated)
  })
});

//Add a workout
router.post("/api/workouts", function(req, res){
  Workout.create({})
  .then((created) => {
    res.json(created);
  })
});

module.exports = router;