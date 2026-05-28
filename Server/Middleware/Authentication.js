import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticatioToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Supports both:
  // 1) Authorization: Bearer <token>
  // 2) Authorization: <token>
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};
