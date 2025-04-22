import { useEffect, useState, useContext} from "react";
import { useNavigate}  from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { FaTrash } from "react-icons/fa";
import { FaTimes } from "react-icons/fa"; // Import a cancel/delete icon

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const {name, userId, role, isLoggedIn, showToast} = useContext(AuthContext)
  const navigate = useNavigate()
  
  //console.log("userId in AppointmentList :", userId, "role :", role)
//***************************************************************************** */
  const fetchUserAppointments = async () => {
    // if (!isLoggedIn) {
    //     showToast("Please Login or sign up first ", "warning")
    // }
    
    try {
      const response = await fetch(`https://hannahmedicalapi.onrender.com/api/appointments/fetch?userId=${userId}`, {
        credentials: "include",
      });
    
       const res = await response.json();
      
      if (response.status === 200) {
        setAppointments(res.appointments);
        console.log('res in fetchUserAppointment : ', res.appointments)
        console.log('appointments in fetchUserAppointment : ', appointments)
      } else {
          console.error("API Error Response:", res);
          return { error: data.message || "Failed to list appointment" };
      }
      
        
      
    } catch (error) {
      console.error("Error booking appointment:", error);
    return { error: "Failed to book appointment. Please try again later." };
    }
  };
//******************************************************************************** */
  const fetchAllAppointments = async () => {
    try {
      const response = await fetch(`https://hannahmedicalapi.onrender.com/api/appointments/search-appointments`, {
        credentials: "include",
      });
    
       const data = await response.json();
      if (response.status === 200) {
         console.log('data in fetchAllAppointment  : ', data)
        setAppointments(data);
        console.log('appointments in fetchAllAppointment : ', appointments)
      } else {
          console.error("API Error Response:", data);
          return { error: data.message || "Failed to list appointment" };
      }
      
    } catch (error) {
      console.error("Error booking appointment:", error);
    return { error: "Failed to book appointment. Please try again later." };
    }
  };

  useEffect(() => {
    if (!userId) navigate("/");
    setLoading(true);
    if (role === "admin") {
      fetchAllAppointments().finally(() => setLoading(false));
    } else {
      fetchUserAppointments().finally(() => setLoading(false));
    }
  }, [userId, role]);
  
  
  
  // **************************************************
  
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`https://hannahmedicalapi.onrender.com/api/appointments/cancel/${appointmentId}`, {
        method: "PATCH", // Use PATCH to update status to 'cancelled'
        credentials: "include",
      });

      const data = await response.json();
      console.log("data in appointmentList :", data)
      if (response.ok){
       // setAppointments(data)
        showToast(' appointment cancelled', "warning")
        navigate("/")
      } else {
        console.error("Api error response:", data)
      }
     
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  console.log("appointments:", appointments, " role :", role);
  console.log("isArray:", Array.isArray(appointments));
  
  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold">My Appointments</h2>
  
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <span className="font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      ) : appointments?.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="p-4 border rounded-lg shadow-md">
             { role !== 'doctor' && (
              <div>
               <p><strong>Doctor:</strong> {appointment.doctorInfo?.name || "N/A"}</p>
               <p><strong>Specialty:</strong> {appointment.doctorInfo?.speciality || "N/A"}</p>
              </div>
             )
             }
             
             {role === 'admin' || role === 'patient'   ?
              ( <p><strong>Patient Name:</strong> {appointment.patientInfo?.name}</p>):
              ( <p><strong>Patient Name:</strong> {appointment.userId?.name}</p>)
             }
             
              {/* {appointment.userId?.name && (
                <p><strong>Patient Name:</strong> {appointment.userId?.name}</p>
              )} */}
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appointment.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              {appointment.status === "confirmed" && role !== 'doctor' && (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="flex items-center px-3 py-1 mt-2 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default AppointmentsPage;
