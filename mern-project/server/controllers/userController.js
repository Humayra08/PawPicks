import User from '../models/userModel.js';

// REGISTER
export const registerUser = async (req, res) => {
  const { fullName, phoneNumber, password, rePassword } = req.body;

  console.log("Password:", password);  // Log the password
  console.log("Repassword:", rePassword);  // Log the repassword

  try {
    // Check if user already exists
    const userExists = await User.findOne({ phoneNumber });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate passwords
    if (password !== rePassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Create new user (only save hashed password)
    const user = await User.create({ fullName, phoneNumber, password });

    // Send success response
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while registering user' });
  }
};

// LOGIN (fullName + password)
export const loginUser = async (req, res) => {
  const { fullName, password } = req.body;

  try {
    // Check if user exists by fullName (instead of phone number)
    const user = await User.findOne({ fullName });

    // Check if the password matches
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber, // You can also send this if needed
      });
    } else {
      res.status(401).json({ message: 'Invalid full name or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while logging in' });
  }
};
