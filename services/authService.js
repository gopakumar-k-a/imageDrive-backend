import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
export const authService = {
  hashPassword: async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error("Error hashing password");
    }
  },

  comparePassword: async (password, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error("Error comparing passwords");
    }
  },

  createJWT: (user) => {
    try {
      const token = jwt.sign(
        { userId: user._id, },
        envConfig.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return token;
    } catch (error) {
      throw new Error("Error creating JWT");
    }
  },
  verifyJWT: (token) => {
    try {
      const decoded = jwt.verify(token, envConfig.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  },
};
