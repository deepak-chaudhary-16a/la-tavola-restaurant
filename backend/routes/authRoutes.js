const express = require("express");
const router = express.Router();
const { signup, login, getMe, createAdmin } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/create-admin", createAdmin);

module.exports = router;
