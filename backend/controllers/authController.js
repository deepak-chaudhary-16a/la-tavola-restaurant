const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
});

// @route POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }
    const user = await User.create({ name, email, password, phone });
    const token = generateToken(user._id);
    res.status(201).json({ user: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.json({ user: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    res.json({ user: sanitizeUser(req.user) });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/create-admin  (protected by ADMIN_SETUP_KEY, for initial setup only)
const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, setupKey } = req.body;
    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({ message: "Invalid setup key" });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }
    const user = await User.create({ name, email, password, role: "admin" });
    const token = generateToken(user._id);
    res.status(201).json({ user: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, getMe, createAdmin };
