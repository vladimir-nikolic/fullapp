const asyncHandler = require("express-async-handler");
// Get goals
// route GET /api/goals
// private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Goals" });
});

// Get goals
// route POST /api/goals/
// private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400); //.json({message : 'Please add a text field'}) 'manual error control'
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set Goal" });
});

// Update goal
// route PUT /api/goals/:id
// private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// delete goal
// route DELETE /api/goals/:id
// private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
