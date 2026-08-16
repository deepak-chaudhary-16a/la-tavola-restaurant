const express = require("express");
const router = express.Router();
const {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} = require("../controllers/reservationController");
const { protect, adminOnly, optionalAuth } = require("../middleware/auth");

router.post("/", optionalAuth, createReservation);
router.get("/mine", protect, getMyReservations);
router.get("/", protect, adminOnly, getAllReservations);
router.put("/:id/status", protect, adminOnly, updateReservationStatus);
router.delete("/:id", protect, adminOnly, deleteReservation);

module.exports = router;
