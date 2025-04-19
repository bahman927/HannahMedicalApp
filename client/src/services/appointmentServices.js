const API_URL = "http://localhost:3000/api/appointments";

export const bookAppointment = async (userId, doctorId, date, time) => {
  try {
    console.log(' appointmentService -> userId : ', userId, "doctorId : ", doctorId, 'date : ', date, 'time : ', time)
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ userId, doctorId, date, time }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error booking appointment:", error);
    return { error: "Failed to book appointment" };
  }
};

export const fetchAppointments = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};
