const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be at most 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // never returned by default
    },
  },
  {
    timestamps: true,       // createdAt + updatedAt auto-managed
    versionKey: false,
  }
);

// ── Hash password before saving ───────────────────────────────────
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

// ── Hash password before findOneAndUpdate ─────────────────────────
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, SALT_ROUNDS);
  }
  next();
});

// ── Instance method: compare plain password to hash ───────────────
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// ── Remove password from JSON output (extra safety layer) ─────────
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// ── Index for search performance ──────────────────────────────────
userSchema.index({ name: "text", email: "text" });

module.exports = mongoose.model("User", userSchema);
