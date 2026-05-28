import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { users } from "./model/UserModel3.js";
import { NotesModel } from "./model/NotesModel.js";
import jwt from "jsonwebtoken";
import { authenticatioToken } from "./Middleware/Authentication.js";
import dotenv from "dotenv";
dotenv.config();
import { apiUrl } from "../client/src/api.js";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "https://notesapplicationwithauthentication.onrender.com",
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hasedpassword = await bcrypt.hash(password, 10);
    const newuser = new users({ name, email, password: hasedpassword });
    await newuser.save();

    const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newuser._id,
        name: newuser.name,
        email: newuser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(400).json({ message: "User not found" });
    }

    const ispasswordmatches = await bcrypt.compare(
      password,
      existinguser.password,
    );
    if (!ispasswordmatches) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existinguser._id,
        name: existinguser.name,
        email: existinguser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// create Notes
app.post("/notes", authenticatioToken, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newnotes = new NotesModel({ title, description, userId: req.userId });
    await newnotes.save();

    return res.status(200).send({
      message: "Notes created successfully",
      data: newnotes,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// get notes
app.get("/notes", authenticatioToken, async (req, res) => {
  try {
    const notes = await NotesModel.find({ userId: req.userId });
    return res
      .status(200)
      .send({ message: "Notes fetched successfully", data: notes });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/notes/:id", authenticatioToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const note = await NotesModel.findOne({ _id: id, userId });
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    return res
      .status(200)
      .send({ message: "Note fetched successfully", data: note });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// update notes
app.put("/notes/:id", authenticatioToken, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const { userId } = req;

  try {
    const updatednotes = await NotesModel.findOneAndUpdate(
      { _id: id, userId },
      { title, description },
      { new: true },
    );

    if (!updatednotes) {
      return res.status(404).send({ message: "Note not found" });
    }

    return res
      .status(200)
      .send({ message: "Note updated successfully", data: updatednotes });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// delete notes
app.delete("/notes/:id", authenticatioToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req; // Extract userId from req

  try {
    const deletednotes = await NotesModel.findOneAndDelete({ _id: id, userId });
    if (!deletednotes) {
      return res.status(404).send({ message: "Note not found" });
    }

    return res
      .status(200)
      .send({ message: "Note deleted successfully", data: deletednotes });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

// mongodb connection
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
connectdb();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
