import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// Generate Access Token (Short-lived)
const generateTokens = (userId) => {
    const newAccessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return { newAccessToken, refreshToken };
};

// **Register**
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(200).json({ message: "Signed Up successfully", user: { id: user._id, email: user.email } });

  } catch (error) {
    res.status(500).json({ message: error.message   });
  }
};

// **Login**
export const login = async (req, res) => {
  try {
   
    const { email, password } = req.body;
    // console.log('req.body.email = ', req.body.email, ' email =', email, 'password = ', password)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "No such user exist!" });
    if (!user.password) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const isMatch =   bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password" });

     // 🔹 Generate tokens
     const { newAccessToken, refreshToken } = generateTokens(user._id);
     console.log('accessToken = ', newAccessToken)
     console.log('authController user.id : ', user.id)
    
     res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict", 
      maxAge: 30 * 60 * 1000,
       });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 1000,
    });
    

    res.json({ message: "Login successful", name: user.name } );
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
        expiresIn: "2m",
      });

      // 🔹 Update access token cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.json({ message: "accessToken refreshed" });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

 
 