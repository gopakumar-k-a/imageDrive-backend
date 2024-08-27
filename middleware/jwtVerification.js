import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

const verifyJWT = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized, token missing", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized, token invalid", 401));
  }
};

export default verifyJWT;
