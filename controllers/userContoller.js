
// userController.js for user APIs

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/userSchema');

const registerUser = async (req, res) => {
  // Implement user registration logic
  try {
    // Extract user data from request body
    const {
      firstName,
      middleName,
      lastName,
      dob,
      mobileNumber,
      email,
      password,
      profileImage,
    } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 7);

    // Create a new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      dob,
      mobileNumber,
      email,
      password: hashedPassword,
      profileImage,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  // Implement user login logic
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Send email to the user
    const transporter = nodemailer.createTransport({
      // configure transporter options (e.g., SMTP settings)
      host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lindsay.cormier@ethereal.email',
            pass: 'A7cX7drhycXBXHYXpx',
        },
    });
    const mailOptions = {
      from: "rehanhere1999@gmail.com",
      to: user.email,
      subject: "Login Successful",
      text: "You have successfully logged in.",
    };
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    // Handle errors
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No such user found" });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    console.error("Error getting user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();

    // Respond with the list of users
    res.status(200).json({ users, count: users.length });
  } catch (error) {
    // Handle errors
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  // Implement update user logic
  try {
    const userId = req.params.userId;
    const updates = req.body;

    // Check if user with the provided ID exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `No user found with this Id ${userId}` });
    }

    // Update user in the database
    await User.findByIdAndUpdate(userId, updates);

    // Respond with success message
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  // Implement delete user logic
  try {
    const userId = req.params.userId;

    // Check if user with the provided ID exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: `User not found with this Id ${userId}` });
    }

    // Delete user from the database
    await User.findByIdAndDelete(userId);

    // Respond with success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    registerUser, loginUser, getUserById, getAllUsers, updateUser, deleteUser
}
