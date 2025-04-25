import { createContext, useState, useEffect, useContext , useRef} from "react";
import { doctors }       from '../assets/assets.js'
import api from '../utils/api.js'
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [docId, setDocId] = useState("")
  const [role, setRole]   = useState(null)
  const [toast, setToast] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [drAppointment, setDrAppointment] = useState({})
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn]  = useState(false)
  const timeoutRef  = useRef(null); // Ref to store timeout
 

  const checkAuth = async () => {
    try {
      const response = await fetch("https://www-promedicalclinic-com.onrender.com/api/auth/check", {
        method:"GET",
        credentials: "include", // Sends HttpOnly cookie
      });
       
      if (response.ok) {
        console.log(' you are in checkAuth response.ok')
       
        const data = await response.json();
        console.log("data -> authContext : ",data) 
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("userId", data.user._id);
        setName(data.user.name);
        setUserId(data.user._id)
        setRole(data.user.role)
        setIsLoggedIn(true)
        console.log("data.name in checkAuth : ", name)
        console.log("isLoggedIn in checkAuth : ", isLoggedIn)
        console.log("userId in checkAuth : ", userId)
      } else {
        console.log(' you are in checkAuth response not ok response :', response)
        if (response.status === 401) {
          console.log("error: User is not authenticated");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("name");
          localStorage.removeItem("userId");
          localStorage.removeItem("role");
          setName(null); 
          setUserId(null)
          setRole(null)
          setIsLoggedIn(false)
          return;
        }
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setName(null);
        setUserId(null)
        setRole(null)
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error("Auth check failed", error);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      setName(null)
      setUserId(null)
      setRole(null)
      setIsLoggedIn(false)
    }
  };

   // On page load, check authentication
    useEffect(() => {
      console.log("isLoggedIn check in useEffect authContext ", localStorage.getItem("isLoggedIn"))
      if (localStorage.getItem("isLoggedIn")) {
       checkAuth();
       }
    }, []);

  const handleIdle = () => {
    showToast("User logged out due to inactivity.", "warning")
    console.log("User is idle, logging out...");
    logout();
  };

  useEffect(() => {
    if (!isLoggedIn) return; // Only run if user is logged in
    
    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleIdle,  7 * 60 * 1000); // 7 min timeout
    };

    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll", "click"];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Start timer on mount

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
    };
  }, [isLoggedIn]); // Run effect when user logs in

//************************************************************************** */
  // 🔹 Login function
//************************************************************************** */  
  const login = async (email, password, role) => {
   
    try {
  // const response = await  fetch("http://localhost:3000/api/auth/login", {
   const response = await  fetch("https://www-promedicalclinic-com.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
      credentials: "include",
    });
    if (!response.ok) {
      const text = await response.text(); // for debug/logging
      throw new Error(`Login failed: ${text}`);
    }
   const data = await response.json();
  // console.log("Login in AuthContext : ", data);
    
    if (response.ok) {
     // console.log(" login data in authContext  = ", data);
       setIsLoggedIn(true)
       setName(data.name);
       setUserId(data.userId)
       setRole(data.role)
       setErrorMessage(null)
       localStorage.setItem("name", data.name);
       localStorage.setItem("role", data.role);
       localStorage.setItem("isLoggedIn", "true");
       localStorage.setItem("userId", data.userId);
       if (data.role === 'doctor') navigate('/appointmentList');
      } else {
        console.log("else in autContex login hit")
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        showToast(data.message, "error");
        return
    }
  } catch (error) {
    console.error("Login request failed:", error);
     setErrorMessage("Login failed. Please try again.");
  }
}

  const logout = async () => {
    try {
      await api.post("/api/auth/logout"); // ✅ API call to clear cookie
      setName(null)
      setIsLoggedIn(false)
      setRole(null)
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userId");
      navigate('/')
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    showToast("Testing Toast", "success");
  }, []);
  
  const showToast = (message, type = "info") => {
    setToast({ message, type } );
    setTimeout(() => { setToast(null) }, 5000); 
    navigate("/")
  };
  console.log("TOAST STATE:", toast);

  return (
   <AuthContext.Provider value={{ name, setName, userId, role, setRole, setDrAppointment, doctors ,login ,logout, checkAuth, showToast, isLoggedIn, setIsLoggedIn,userId, setUserId, docId, setDocId, errorMessage, setErrorMessage}}>
    
     {children}
     {toast && <Toast message={toast.message} type={toast.type}  />}
   </AuthContext.Provider>
  )
};


