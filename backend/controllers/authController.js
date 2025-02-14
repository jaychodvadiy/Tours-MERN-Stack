import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import User from "../models/userModel.js";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ✅ Register User
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create new user with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error); // Debugging log
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login Attempt:", email);

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    console.log("User Found:", user);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Debug Password Hashing Issue
    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    const { password: _, ...userData } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
