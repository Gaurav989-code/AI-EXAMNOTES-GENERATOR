import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(403).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // FIX: Populate BOTH properties to ensure all your controller files work smoothly!
    req.userId = decoded.userId;
    req.user = decoded.userId;

    next();
  } catch (error) {
    console.error("Authentication Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token expired." });
    }

    if (!res.headersSent) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Invalid session.",
      });
    }
  }
};

export default authMiddleware;
