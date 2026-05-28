import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { user3 } from "./model/userModel3.js";
import { gettingToken } from "./Middleware/Authentication.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

const app = express();
app.use(express.json());

//singup route
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userexist = await user3.findOne({ email });
    if (userexist) {
      res.send({ message: "User Aalredy existed" });
    }
    // Hash the password before saving to database &create new user
    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = new user3({ name, email, password: hashedpassword });
    await newuser.save();
    res
      .status(200)
      .send({ message: "User Created Sucessfully", data: newuser });
  } catch (error) {
    res.status(500).send({ message: `Error, ${error.message}` });
  }
});

//login route

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await user3.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid Password" });
    }
    // Generate JWT token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "User Logged in Sucessfully", token });
  } catch (error) {
    res.status(500).send({ message: `Error, ${error.message}` });
  }
});

//protected route
// what it does is it checks if the user is authenticated by verifying the JWT token sent in the request header. If the token is valid, it allows access to the protected route and retrieves the user's information from the database using the user ID extracted from the token. Finally, it sends a response with a message and the user's information.

app.get("/api/protected", gettingToken, async (req, res) => {
  const user = await user3.findById(req.userId);
  res
    .status(200)
    .send({ message: `This is a protected route. Your user ID is ${user}` });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running On Port :${process.env.PORT}`);
});

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Sucessfully");
  } catch (error) {
    console.log("Error Connecting to Database", error.message);
  }
};

connectDb();
