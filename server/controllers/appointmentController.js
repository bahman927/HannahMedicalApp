import  Appointment from '../models/appointmentSchema.js';
import  Doctor      from '../models/doctorSchema.js';
import  User        from "../models/userSchema.js";
import mongoose     from "mongoose";

export const bookAppointment = async (req, res) => {
    try {
        console.log("Received request body:", req.body); 
        const { userId, doctorId, formattedDate, time } = req.body;

        if (!userId || !doctorId || !formattedDate || !time) {
            return res.status(400).json({ message: "All fields are required." });
          }
        // doctorId = new mongoose.Types.ObjectId(doctorId);
        const user = await User.findById(userId);

        const doctor = await Doctor.findOne({docId:doctorId});
        console.log('doctor in bookAppointment : ', doctor)
        if (!doctor || !user) return res.status(404).json({ message: ' User or Doctor not found' });

       
        if (!mongoose.Types.ObjectId.isValid(user._id) || !mongoose.Types.ObjectId.isValid(doctor._id)) {
            return res.status(400).json({ message: "Invalid userId or doctorId" });
          }
      
          //userId = new mongoose.Types.ObjectId(userId);
          
          const appointment = new Appointment({
             doctorId:doctor.userId,
             userId: userId,
             date:formattedDate,
             time:time
        });
        console.log("Appointment Data:", appointment);
        await appointment.save();
        doctor.appointments.push(appointment._id);
        await doctor.save();

        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Error booking appointment", error });
    }
};
//*********************************************************** */
export const getDoctorAppointments = async (req, res) => {
    try {
      const { userId } = req.query;
      console.log("userId in getDoctorAppointments : ", userId)
    
        const doctor = await Doctor.findOne({ userId: userId }); 
        const appointments = await Appointment.find({ doctorId: doctor.doctorId }).populate('userId', "name").populate('doctorId', "name speciality image" );
        res.status(200).json(appointments);
      

     
    } catch (error) {      res.status(500).json({ message: "Error fetching doctor appointments", error });
    }
  };

//******************************************************** */
 

export const fetchAppointments = async (req, res) => {
  try {
    const { id, role } = req.user;
    const userId = new mongoose.Types.ObjectId(id);
    let appointments = [];

    // If role is PATIENT
    if (role === "patient") {
      appointments = await Appointment.aggregate([
        {
          $match: { userId },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "userId",
            as: "doctorInfo",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "patientInfo",
          },
        },
        { $unwind: { path: "$doctorInfo", preserveNullAndEmptyArrays: true } },
        { $unwind: { path: "$patientInfo", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            date: 1,
            time: 1,
            status: 1,
            userId: 1,
            doctorId: 1,
            "doctorInfo.name": 1,
            "doctorInfo.speciality": 1,
            "patientInfo.name": 1,
          },
        },
      ]);
    }

    // If role is DOCTOR
    if (role === "doctor") {
      const doctorInfo = await Doctor.findOne({ userId: id }).lean();

      appointments = await Appointment.aggregate([
        {
          $match: { doctorId: userId },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "patientInfo",
          },
        },
        { $unwind: { path: "$patientInfo", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            date: 1,
            time: 1,
            status: 1,
            doctorId: 1,
            userId: {
              _id: "$patientInfo._id",
              name: "$patientInfo.name",
              role: "$patientInfo.role",
            },
          },
        },
      ]);

      return res.status(200).json({
        doctorInfo: {
          name: doctorInfo?.name || "",
          speciality: doctorInfo?.speciality || "",
        },
        appointments,
     });
    }
  
    // Default return (patient)
    return res.status(200).json({ appointments });

  } catch (error) {
    console.error("Error in fetchAppointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

//***************************************************************** */
  export const cancelAppointment = async (req, res) => {
    try {
      const { appointmentId } = req.params;
      
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        { status: "cancelled" }, // Only update status instead of deleting
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      console.log("updatedAppointment : ", updatedAppointment)
  
      res.status(200).json({ message: "Appointment cancelled successfully", updatedAppointment });
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      res.status(500).json({ error: "Error cancelling appointment" });
    }
  };
  

  export const searchAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.aggregate([
    
        {
          $lookup: {
            from: "doctors", // the name of the collection, not the model
            localField: "doctorId",    // field in Appointment
            foreignField: "userId",    // field in Doctor
            as: "doctorInfo"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "patientInfo",
          },
        },
        { $unwind: { path: "$doctorInfo", preserveNullAndEmptyArrays: true }},
        { $unwind: { path: "$patientInfo", preserveNullAndEmptyArrays: true } },
        
        {
          $project: {
            _id: 1,
            date: 1,
            time: 1,
            status: 1,
            doctorId: 1,
            userId: 1,
            "patientInfo.name":1,
            doctorInfo: {
              name: "$doctorInfo.name",
              speciality: "$doctorInfo.speciality"}
          }
        }
      ]);
      console.log("appointments in searchappointment :", appointments)
      res.status(200).json(appointments);
      
      //res.json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  