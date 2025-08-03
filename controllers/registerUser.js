import User from '../models/User.js';
import { generateToken } from './auth.js'; // haddii aad token sameyso

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Halkan password-ka aan la hash-gareynin gacanta,
    // waxaa hash gareyn doona model-ka 'pre-save' middleware
    const user = new User({
      username,
      password,
    });

    const createdUser = await user.save();

    res.status(201).json({
      _id: createdUser._id,
      username: createdUser.username,
      token: generateToken(createdUser._id), // hadii aad rabto token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerUser };
