import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// helper
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// REGISTER
export const registerUser = async (req, res) => {
  const { fullName, phoneNumber, password, rePassword } = req.body;
  try {
    if (!fullName || !phoneNumber || !password)
      return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ phoneNumber });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    if (password !== rePassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const user = await User.create({ fullName, phoneNumber, password });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while registering user' });
  }
};

// LOGIN (fullName + password)
export const loginUser = async (req, res) => {
  const { fullName, password } = req.body;
  try {
    const user = await User.findOne({ fullName });
    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email || '',
        avatarUrl: user.avatarUrl || '',
        token: genToken(user._id),
      });
    }
    return res.status(401).json({ message: 'Invalid full name or password' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while logging in' });
  }
};

// GET PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// UPDATE PROFILE (name/phone/email)
export const updateUserProfile = async (req, res) => {
  const { fullName, phoneNumber, email } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (fullName !== undefined) user.fullName = fullName;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (email !== undefined) user.email = email;

    await user.save();
    res.json({
      message: 'Profile updated successfully',
      user: {
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        avatarUrl: user.avatarUrl || '',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// UPLOAD AVATAR
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // public URL we served in server.js
    const avatarUrl = `/uploads/${req.file.filename}`;
    user.avatarUrl = avatarUrl;
    await user.save();

    res.json({ message: 'Avatar updated', avatarUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading avatar' });
  }
};
