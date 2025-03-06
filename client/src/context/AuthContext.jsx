import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios'
import { doctors }       from '../assets/assets.js'
import api from '../utils/api.js'
import fetchWithTokenRefresh from "../utils/fetchWithTokenRefresh"

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
 
  const [name, setName] = useState('');
  const [drAppointment, setDrAppointment] = useState({})
 
  // 🔹 Login function
  const login = async (email, password) => {
    try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
   
    const data = await response.json();
    console.log("Login Response:", data);
     
    if (response.ok) {
      console.log(" data.name = ", data.name)
      setName(data.name); // Save user info in context
      console.log(" name = ", name)
    } else {
      alert(`Error: ${data.message}`);
    }
     
  } catch (error) {
    console.error("Login error:", error.message);
  }
}

  // 🔹 Logout function
  const logout = async () => {
    try {
      await api.post("/api/auth/logout"); // ✅ API call to clear cookie
      setName(null); // ✅ Remove user from context
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  useEffect(() => {
    const checkUserSession = async () => {
      try {

        // Fetch user details if token is valid
        const response = await fetchWithTokenRefresh(() => api.get("/api/user/me"));
        console.log('authContext response.data = ', response.data)
        
        
        setName(response.data.name); // Store user info in state

      } catch (error) {
        console.log("Not logged in or session expired");
        setName(null); // Reset user state if token is invalid
      }
    };
    checkUserSession();
  }, []);

  return (
   <AuthContext.Provider value={{ name, setName, setDrAppointment, doctors ,login ,logout }}>
     {children}
   </AuthContext.Provider>
  )
};


