import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from '../models/userSchema.js'

const router = express.Router();

// Protected Route
router.get("/me", authMiddleware, getCurrentUser);
// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      res.status(200).json(user);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});


export default router;
