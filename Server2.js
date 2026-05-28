import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import { usermodel2 } from "./model/userModel2.js";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/api/createuser", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newuser = await usermodel2.create({ name, email });
    res.status(201).send({ message: "User created", data: newuser });
  } catch (error) {
    res.status(500).send({ message: "Error Creating user", error: error.message });
  }
});

app.get("/api/getallusers", async (req, res) => {
  try {
    const allusers = await usermodel2.find();
    res.status(200).send({ message: "All users Fetched", data: allusers });
  } catch (error) {
    res.status(500).send({ message: "Error fetching users", error: error.message });
  }
});

app.get("/api/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel2.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User Fetched", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error fetching user", error: error.message });
  }
});

app.put("/api/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await usermodel2.findOneAndUpdate(
      { _id: id },
      { name, email },
      { new: true },
    );
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User Updated", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error: error.message });
  }
});

app.delete("/api/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel2.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User Deleted", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error: error.message });
  }
});

app.delete("/api/deleteallusers", async (req, res) => {
  try {
    const user = await usermodel2.deleteMany();
    res.status(200).send({ message: "All users deleted", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error deleting users", error: error.message });
  }
});

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

// Initiate database connection
connectDb();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
