import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Route
router.get("/me", authMiddleware, getCurrentUser);

export default router;
