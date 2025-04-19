import express from "express";
import {
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  // disableDoctor,
  
} from "../controllers/doctorController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateAdmin, getDoctors); // Get all doctors
router.get("/:id", authenticateAdmin, getDoctorById); // Get doctor by ID
router.post("/", authenticateAdmin, addDoctor); // Add new doctor (Admin only)
router.put("/:id", authenticateAdmin, updateDoctor); // Update doctor info 
// router.put("/:id/disable", authenticateAdmin, disableDoctor); // Soft delete (Disable)

export default router;
