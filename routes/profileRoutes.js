import { Router } from "express";
import profileController from "../controller/profileController.js";
const router = Router();

const profileRoutes = () => {
  router.patch("/reset-password", profileController().resetPassword);
  return router;
};

export default profileRoutes;
