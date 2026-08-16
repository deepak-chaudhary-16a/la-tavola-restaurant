const express = require("express");
const router = express.Router();
const Newsletter = require("../models/Newsletter");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: "You're already subscribed!" });
    }
    await Newsletter.create({ email });
    res.status(201).json({ message: "Subscribed! Thanks for joining." });
  } catch (err) {
    next(err);
  }
});

router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    next(err);
  }
});

module.exports = router;