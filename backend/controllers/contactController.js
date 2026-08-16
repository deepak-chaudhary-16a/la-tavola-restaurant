const Contact = require("../models/Contact");

// @route POST /api/contact  (public)
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/contact  (admin)
const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/contact/:id/read  (admin)
const markAsRead = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json(message);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/contact/:id  (admin)
const deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getAllMessages, markAsRead, deleteMessage };
