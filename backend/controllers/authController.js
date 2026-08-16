const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER (Client only)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({ message: "Registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN (Admin + Client)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 👑 ADMIN LOGIN (hardcoded)
    if (email === "admin@gmail.com" && password === "admin123") {
      const token = jwt.sign({ role: "admin" }, "secretkey");

      return res.json({
        token,
        role: "admin"
      });
    }

    // 👤 USER LOGIN (DB)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id, role: "user" }, "secretkey");

    res.json({
      token,
      role: "user"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};