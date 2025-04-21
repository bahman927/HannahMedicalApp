import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import Doctor from "../models/doctorSchema.js";
//import { normalizePath } from "vite";

// Generate Access Token (Short-lived)
const generateTokens = (userId, role) => {
    const newAccessToken = jwt.sign({ id: userId, role:role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "25m",
    });

    // const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    //   expiresIn: "7d",
    // });

  //  return { newAccessToken, refreshToken };
    return { newAccessToken};
};

// **Register**
export const register = async (req, res) => {
      let role;
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    // if (name === "admin") role="admin";
    const user = await User.create({ name, email, password: hashedPassword, role:role });

    return res.status(200).json({ message: "Signed Up successfully", user: { id: user._id, email: user.email, role: user.role } });

  } catch (error) {
    res.status(500).json({ message: error.message   });
  }
};

// **Login**
export const login = async (req, res) => {
  try {
   
    const { email, password, role } = req.body;
    console.log("req.body in authController :", req.body)
    
    const user = await User.findOne({ email });
    console.log("user in authController :", user)

    if (!user) return res.status(400).json({ message: "No such user exist!" });
    if (!user.password) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const isMatch =  await  bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password" });
    if (user?.role !== role){  return res.status(400).json({ message: "Wrong Role" });}

     
     if (role === "doctor"){
       const doctor = await Doctor.findOne({userId:user._id})
       console.log("doctor in authController :", doctor)
      } 

     // 🔹 Generate tokens
    // const { newAccessToken, refreshToken } = generateTokens(user._id);
     const { newAccessToken } = generateTokens(user._id, user.role);
    //  console.log('accessToken = ', newAccessToken)
    //  console.log('authController user.id : ', user.id)
    
     res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    
       });

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 1000,
    // });
    

    res.json({ message: "Login successful", name: user.name, userId:user._id, role: user.role } );
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// **Refresh  Access Token**
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ message: "Refresh token missing" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) 

      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_SECRET, {
        expiresIn: "20m",
      });

      // 🔹 Update access token cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.json({ message: "accessToken refreshed" });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = async  (req, res) => {
 // console.log(" authController req.cookies: ", req.cookies )
  console.log(" authController req.cookies.token: ", req.cookies.accessToken )
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Use your actual secret key
    console.log('decoded : ', decoded)
    const id = decoded.id
    const user = await User.findOne({_id: id });
    console.log('user in authController -> checkAuth : ', user)
    if (!user) return res.status(400).json({ message: "No such user exist!" });
   return  res.json({ user } ); 

  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// **Logout**
export const logout = (req, res) => {
  try {

    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "None" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "None" });
    
    return res.status(200).json({ message: "Logout successful" });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};

 
 