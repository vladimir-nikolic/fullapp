const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  loggedUser,
} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/logged", protect, loggedUser);

module.exports = router;
