import Doctor from "../models/doctorSchema.js";
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt'
import {useParams} from "react-router-dom"

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params; // ✅ `req.params` is an object
    console.log("Received doctorId:", req.params.id); // Debugging step
    
    const doctor = await Doctor.findById(id);
    console.log(" doctor in doctorController : ", doctor, "doctorId in doctorController : ", id)
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};

// Add a new doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      docId,
      speciality,
      experience,
      bio,
      image,
      status
    } = req.body;

    console.log("req.body in doctorController : ", req.body)
  //   const name1 = req.body.name
  //   const newDoctorData = { ...req.body, experience: Number(req.body.experience) };
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //  // console.log("password : " , hashedPassword)
  //   const email1 = req.body.email
  //  const user = await User.create({name:name1, email:email1, password:hashedPassword, role:"doctor" });
  const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    const savedUser = await newUser.save();
    console.log("savedUser in doctorController : ", savedUser)
    const newDoctor = new Doctor({
      docId,
      userId: savedUser._id,
      name,
      speciality,
      experience: Number(experience),
      bio,
      image,
      status
    });

    //const newDoctor = new Doctor(req.body);
    await newDoctor.save();

    res.status(201).json({ message: "Doctor added successfully", newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctor", error });
  }
};

// Update doctor info
export const updateDoctor = async (req, res) => {
  try {
    
    const updatedData = req.body;  // Extract updated doctor data from request body

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,  // Return the updated document
      runValidators: true,  // Ensure validation rules are applied
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);  // Send back updated doctor
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Disable doctor (Soft Delete)
// export const disableDoctor = async (req, res) => {
//   try {
//     const doctor = await Doctor.findByIdAndUpdate(req.params.id, { status: "disabled" }, { new: true });
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });
//     res.json({ message: "Doctor disabled", doctor });
//   } catch (error) {
//     res.status(500).json({ message: "Error disabling doctor", error });
//   }
// };

// // Delete doctor permanently (Only if no appointments)
// export const deleteDoctor = async (req, res) => {
//   try {
//     // Check if doctor has appointments before deletion
//     const hasAppointments = false; // Replace with actual check from Appointment model
//     if (hasAppointments) return res.status(400).json({ message: "Doctor has appointments, cannot be deleted" });

//     const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
//     if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });
//     res.json({ message: "Doctor deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting doctor", error });
//   }
// };
