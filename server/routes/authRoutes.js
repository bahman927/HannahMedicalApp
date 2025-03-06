import express from "express";
import { login, register, refreshToken, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signUp", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);



export default router;
