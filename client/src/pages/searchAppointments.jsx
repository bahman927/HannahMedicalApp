import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/search-appointments?query=${query}`, {
          credentials: "include",
        });
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    if (query) {
      fetchAppointments();
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Appointments for "{query}"</h2>
      {appointments.length > 0 ? (
        <ul className="mt-4">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="p-2 my-2 border">
              Doctor: {appointment.doctorId.name} | Date: {appointment.date} | Time: {appointment.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default SearchAppointments;
