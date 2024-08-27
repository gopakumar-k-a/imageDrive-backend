import asyncHandler from "express-async-handler";
import { User } from "../model/userModel.js";
import { authService } from "../services/authService.js";
import ErrorResponse from "../utils/errorResponse.js";
const profileController = () => {
  const resetPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    
    if (newPassword != confirmNewPassword) {
      throw new ErrorResponse(
        "new password and confirm password must be same ",
        409
      );
    }

    if (currentPassword == newPassword) {
      throw new ErrorResponse(
        "old password and new password should not be the same ",
        409
      );
    }
    if (req.user && req.user.userId) {
      const { userId } = req.user;


      const user = await User.findById(userId);


      if (user) {
        const isPasswordTrue = await authService.comparePassword(
          currentPassword,
          user.password
        );


        if (isPasswordTrue) {
          const hashedNewPassword = await authService.hashPassword(newPassword);
          user.password = hashedNewPassword;
          await user.save();
        } else {
          throw new ErrorResponse("old password is not correct ", 404);
        }
      } else {
        throw new ErrorResponse("no user found ", 404);
      }
    } else {
      throw new ErrorResponse("no user found ", 404);
    }
    res.status(201).json({ message: "password updated successfully" });
  });

  return {
    resetPassword,
  };
};

export default profileController;
