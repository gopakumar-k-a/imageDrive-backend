import asyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import { authService } from "../services/authService.js";
import ErrorResponse from "../utils/errorResponse.js";

 const authController = () => {
  const register = asyncHandler(async (req, res) => {
    const { email, password, phone } = req.body;

    if (!email || !password  || !phone) {
      throw new ErrorResponse("all credentials are required", 409);
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ErrorResponse("User already exists", 409);
    }
    const hashedPassword = await authService.hashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully",email });
  });

  const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (
      !user ||
      !(await authService.comparePassword(password, user.password))
    ) {
      throw new ErrorResponse("invalid credentials", 404);
    }
    const { password: _, ...userWithoutPass } = user.toObject();
    const token = authService.createJWT({
      _id: user._id,
    });
    res.json({ token, credentials: userWithoutPass });
  });

  return {
    register,
    login,
  };
};

export default authController