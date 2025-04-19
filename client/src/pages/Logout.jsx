import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { setName, setDrAppointment } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include cookies
      });
      const data = await response.json();
      console.log("Logout Response:", data);
      setName(null);
      setDrAppointment({});
      setIsLoggedIn(false)
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500 rounded">
      Logout
    </button>
  );
};
export default Logout;
