// server/controllers/userController.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (id) => {
  // token expires in 7 days; feel free to change
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// REGISTER
export const registerUser = async (req, res) => {
  const { fullName, phoneNumber, password, rePassword } = req.body;
  try {
    if (!fullName || !phoneNumber || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    if (password !== rePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ fullName, phoneNumber, password });
    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error while registering user" });
  }
};

// LOGIN (fullName + password)
export const loginUser = async (req, res) => {
  const { fullName, password } = req.body;
  try {
    const user = await User.findOne({ fullName });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        token,
      });
    }
    return res.status(401).json({ message: "Invalid full name or password" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error while logging in" });
  }
};

// GET PROFILE (protected)
export const getUserProfile = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error fetching profile" });
  }
};

// UPDATE PROFILE (protected)
export const updateUserProfile = async (req, res) => {
  try {
    const updates = {};
    // allow these updatable fields via Profile.jsx
    ["fullName", "phoneNumber", "email", "avatarUrl"].forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true, select: "-password" }
    );
    return res.json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error updating profile" });
  }
};
