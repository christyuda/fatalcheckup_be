const User = require('../models/User');
const Biodata = require('../models/Biodata');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
require('dotenv').config();


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.register = async (req, res) => {
  const { username, email, password, biodata } = req.body; // Accept biodata as part of the request body
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        status: 'duplicate',
        message: 'Username or email already exists. Please log in.',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Ideally, password should be hashed
    });
    await newUser.save();

    // Create a new biodata entry linked to the user
    const newBiodata = new Biodata({
      userId: newUser._id,
      nama: biodata.nama,
      ttl: biodata.ttl,
      umur: biodata.umur,
      kehamilanKe: biodata.kehamilanKe,
      harapan: biodata.harapan,
      persalinanSecara: biodata.persalinanSecara,
      tempatDanPenolong: biodata.tempatDanPenolong,
      biayaDanKendaraan: biodata.biayaDanKendaraan,
    });
    await newBiodata.save();

    res.status(201).json({
      status: 'success',
      message: 'User and biodata registered successfully',
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Server error. Please try again later.',
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

    res.status(200).json({
      message: 'Login successful, welcome!',
      data: {
        token: `1|${token}`,
        username: user.username,
        userId: user._id
      }
    });
  } catch (error) {
    console.error("Server error during login:", error); // Log error details for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};