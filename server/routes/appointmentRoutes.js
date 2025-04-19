import express from "express";
import { bookAppointment, fetchAppointments, getDoctorAppointments, cancelAppointment, searchAppointments } from "../controllers/appointmentController.js";
import {authMiddleware}  from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/fetch", authMiddleware,   fetchAppointments);
router.post("/book",                   bookAppointment);
router.patch("/cancel/:appointmentId", cancelAppointment);
router.get("/search-appointments", authMiddleware, searchAppointments);
export default router;
