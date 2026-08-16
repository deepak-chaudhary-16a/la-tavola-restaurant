const MenuItem = require("../models/MenuItem");

// @route GET /api/menu  (public - only available items, optional ?category=)
const getMenu = async (req, res, next) => {
  try {
    const filter = { isAvailable: true };
    if (req.query.category) filter.category = req.query.category;
    const items = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/menu/all  (admin - all items including unavailable)
const getAllMenuItems = async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ category: 1, name: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/menu  (admin)
const createMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/menu/:id  (admin)
const updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/menu/:id  (admin)
const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMenu, getAllMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
