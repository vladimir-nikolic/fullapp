const asyncHandler = require("express-async-handler"); // instead of try-catch block ( look  asyncHandler)

const Goal = require("../models/goalsModel");
const User = require("../models/userModel");

// Get goals
// route GET /api/goals
// private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id});

  res.status(200).json(goals);
});

// Set / create goal
// route POST /api/goals/
// private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400); //.json({message : 'Please add a text field'}) 'manual error control'
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// Update goal
// route PUT /api/goals/:id
// private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// delete goal
// route DELETE /api/goals/:id
// private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id); //

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const delGoal = await Goal.findByIdAndRemove({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
