// Get goals
// route GET /api/goals
// private
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals" });
};

// Get goals
// route POST /api/goals/
// private
const setGoal = (req, res) => {
  res.status(200).json({ message: "Set Goal" });
};

// Update goal
// route PUT /api/goals/:id
// private
const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
};

// delete goal
// route DELETE /api/goals/:id
// private
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
