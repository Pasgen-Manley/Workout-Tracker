const router = require('express').Router();
const Workout = require('../models/workout.js');

//Gets last workout
router.get("/api/workout", (req, res) => {
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
router.get("/api/workout/range", (req, res) => {
  Workout.aggregate([{
    "addFields": {
      "totalDuration": {
        "sum": "$exercises.duration"
      }
    }
  }])
    .sort({_id:-1}).limit(7)
    .then(result => {
      res.json(result)
    })
    .catch((err) => {
      res.status(400).json(err);
    })
});

//Add an exercise
router.put("/api/workout/:id", function(req, res){
  Workout.findByIdAndUpdate(req.params.ud, {
    "$push": {
      "exercises": req.body
    }
  }, {new: true})
  .then((updated) => {
    res.json(updated)
  })
});

//Add a workout
router.post("/api/workout", function(req, res){
  Workout.create({})
  .then((created) => {
    res.json(created);
  })
});

module.exports = router;