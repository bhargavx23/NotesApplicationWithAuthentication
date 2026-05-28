import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const ConnectDb = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
