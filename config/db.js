import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";
const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
