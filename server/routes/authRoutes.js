import express from "express";
import { login, register, refreshToken, logout, checkAuth } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signUp", register);
router.get("/check", checkAuth);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);



export default router;
