import axios from "axios"
 
// Create an Axios instance
const api = axios.create({
  baseURL: 'https://hannahmedicalapp.onrender.com/api',
  //baseURL: "http://localhost:3000",
  withCredentials: true, // Ensures cookies (including refresh token) are sent with request
});
 
// Function to handle logout
// const handleLogout = () => {
//   localStorage.removeItem("user"); // Clear any user data
//   window.location.href = "/login"; // Redirect to login page
// };
export default api;
