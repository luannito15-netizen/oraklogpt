const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const buildSearchFilter = (search) => {
  if (!search) return {};
  const regex = new RegExp(search, "i");
  return { $or: [{ name: regex }, { email: regex }] };
};

// ─────────────────────────────────────────────────────────────────
// POST /users — Create user
// ─────────────────────────────────────────────────────────────────
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Duplicate email check (mongoose unique constraint also guards, but gives clearer message)
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────
// GET /users — List users (paginated + optional search)
// ─────────────────────────────────────────────────────────────────
const listUsers = async (req, res, next) => {
  try {
    const { page, limit, search } = req.query;

    const filter = buildSearchFilter(search);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          totalPages,
          currentPage: page,
          perPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────
// GET /users/:id — Get single user
// ─────────────────────────────────────────────────────────────────
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────
// PUT /users/:id — Update user
// ─────────────────────────────────────────────────────────────────
const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.params.id).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check email uniqueness if being changed
    if (email && email !== user.email) {
      const taken = await User.findOne({ email });
      if (taken) {
        return res.status(409).json({
          success: false,
          message: "A user with this email already exists",
        });
      }
      user.email = email;
    }

    if (name) user.name = name;

    // Triggers the pre-save hook → re-hashes password
    if (password) user.password = password;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────
// DELETE /users/:id — Delete user
// ─────────────────────────────────────────────────────────────────
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────────
// POST /auth/login — Authenticate user, return JWT
// ─────────────────────────────────────────────────────────────────
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = signToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, listUsers, getUser, updateUser, deleteUser, loginUser };
