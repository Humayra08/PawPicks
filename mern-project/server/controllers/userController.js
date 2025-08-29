import User from '../models/userModel.js';

// REGISTER
export const registerUser = async (req, res) => {
  const { fullName, phoneNumber, password, rePassword } = req.body;

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

// LOGIN
// LOGIN (fullName + password)
export const loginUser = async (req, res) => {
  const { fullName, password } = req.body;

  try {
    const user = await User.findOne({ fullName }); // <-- changed

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
      });
    }
    res.status(401).json({ message: 'Invalid full name or password' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while logging in' });
  }
};
