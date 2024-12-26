import userModel from "../models/user.model.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const Get = async (req, res) => {
  try {
    const users = await userModel.find({}, { username: 1, email: 1, role: 1 });
    return res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json(error);
  }
};
const GetByToken = async (req, res) => {
  return res.status(200).json({ data: req.user });
};
// Signup Route
const SignUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create and save the new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      data: { username, email },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Login Route
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify the password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: user.username, email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Protected Route
// const api = "/protected", authenticateToken, (req, res) => {
//   res.status(200).json({
//     message: `Hello, ${req.user.username}! This is a protected route.`,
//   });
// });

// Logout Route (example, invalidates token on client side)
const Logout = (req, res) => {
  res
    .status(200)
    .json({ message: "Logged out successfully. Please discard your token." });
};

export { SignUp, Login, Logout, Get, GetByToken };
