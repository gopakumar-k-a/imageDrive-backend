import { Router } from "express";

import authController from "../controller/authController.js";
const router = Router();

const authRoutes = () => {
  router.post("/login", authController().login);
  router.post("/register", authController().register);
  return router;
};

export default authRoutes;
