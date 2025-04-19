import jwt from "jsonwebtoken";
import User from '../models/userSchema.js'

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export const authMiddleware = (req, res, next) => {
  // 1️⃣ Get the token from cookies (or Authorization header if needed)
  const token = req.cookies?.accessToken; // Ensure token exists safely
  console.log("authMiddleware Token:", token);
  console.log("authMiddleware req.cookies :", req.cookies);
  // 2️⃣ If no token, return 401 Unauthorized
  if (!token) {
    return 
  } 
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('decoded= ', decoded)
    req.user = {};
    req.user.id = decoded.id || {}; // Attach user data to request
    console.log('decoded= ', decoded, 'req.user.id = ', req.user.id)

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
     // Move to the next middleware
  } catch (error) {
    // 4️⃣ Handle token expiration
    console.error("JWT Verification Error:", error); // Log the error
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken
    console.log("token in authenticateAdmin : ", token, "req.cookies : ", req.cookies)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify JWT and decode payload
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded JWT:", decoded); 
    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

 
 