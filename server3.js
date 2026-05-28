import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { user3 } from "./model/UserModel3.js";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const UseExist = await user3.findOne({ email });
    if (UseExist) {
      res.status(200).send({ message: "User already Existed" });
    }

    const newuser = new user3({ name, email, password });
    await newuser.save();
    res.status(200);

    res.send({ message: "User Created sucessfully", data: newuser });
  } catch (error) {
    res.status(500).send({ message: `error,${error.meesage}` });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await user3.findOne({ email, password });
    if (!user) {
      res.send({ message: "User Not found" });
    }
    const UseExist = await user3.findOne({ email });
    if (UseExist) {
      if (user.password == password) {
        res
          .status(200)
          .send({ message: `${user.name} Authenticated sucessfully` });
      } else {
        res.status(500).send({ message: "Wrong password" });
      }
      res
        .status(200)
        .send({ message: `${UseExist.name} Loggedin Sucessfully` });
    }
  } catch (error) {
    res.status(500).send(error.meesage);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Sucessfully");
  } catch (error) {
    console.log(error.message);
  }
};
connectdb();
