import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { envConfig } from "./config/envConfig.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import ErrorResponse from "./utils/errorResponse.js";
import verifyJWT from "./middleware/jwtVerification.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

connectDB();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/api/auth", authRoutes());
app.use("/api/profile", verifyJWT, profileRoutes());
app.use("/api/image", verifyJWT, imageRoutes());
app.use("*", (req, res, next) => {
  next(new ErrorResponse(`Route ${req.originalUrl} not found`, 404));
});
app.use(errorHandler);
const PORT = envConfig.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
