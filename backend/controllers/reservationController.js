const Reservation = require("../models/Reservation");

// @route POST /api/reservations  (public - logged-in users get linked automatically)
const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }
    const reservation = await Reservation.create({
      user: req.user ? req.user._id : null,
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests,
    });
    res.status(201).json(reservation);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/reservations/mine  (logged-in user's own reservations)
const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/reservations  (admin - all reservations)
const getAllReservations = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const reservations = await Reservation.find(filter).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/reservations/:id/status  (admin)
const updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/reservations/:id  (admin)
const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    res.json({ message: "Reservation deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
};
