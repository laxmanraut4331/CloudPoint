import bcrypt from "bcryptjs";
import Admin from "../models/admin.model.js";
import { generateToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    if (newAdmin) {
      await newAdmin.save();
      generateToken(newAdmin._id, res);
      return res.status(201).json({
        _id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      });
    } else {
      return res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (err) {
    console.log(err);
    return res.Status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }
    const isPassword = await bcrypt.compare(password, admin.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateToken(admin._id, res);
    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      message: "Login successful",
    });
  } catch (err) {
    console.log("something went wrong whole loging", err);
    return res.status(500).json({ message: "internal server issue" });
  }
};

//logout
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.log("something went wrong  while logging out", err);
    res.status(500).json({ message: "internal server issue" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");

    if (!admin)
      return res.status(404).json({
        message: "User not found",
      });

    // IMPORTANT: send username
    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Auth check failed",
    });
  }
};

//google auth

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, sub } = payload;

    let user = await Admin.findOne({ email });

    if (!user) {
      user = await Admin.create({
        username: name,
        email: email,
        password: sub, // placeholder
        role: "admin",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
};
