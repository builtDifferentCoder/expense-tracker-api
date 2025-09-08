import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(429).json({
        message:
          "User with the given credentials already exists.Please try again.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = generateToken(newUser);
    return res.status(201).json({
      message: "User created successfully.",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Interal server error occured.",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message:
          "User with the given credentials does not  exist.Please try again.",
      });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res.status(429).json({
        message: "Invalid password.",
      });
    }
    const token = generateToken(existingUser);
    return res.status(200).json({
      message: "User loggedIn successfully.",
      token: token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Interal server error occured.",
    });
  }
};
