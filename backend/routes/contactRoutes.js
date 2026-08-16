const express = require("express");
const router = express.Router();
const {
  submitContact,
  getAllMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", submitContact);
router.get("/", protect, adminOnly, getAllMessages);
router.put("/:id/read", protect, adminOnly, markAsRead);
router.delete("/:id", protect, adminOnly, deleteMessage);

module.exports = router;
