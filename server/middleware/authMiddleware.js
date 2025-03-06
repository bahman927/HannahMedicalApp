import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
  // 1️⃣ Get the token from cookies (or Authorization header if needed)
  const token = req.cookies?.accessToken; // Ensure token exists safely
  console.log("authMiddleware Token:", token);
  console.log("authMiddleware req.cookies :", req.cookies);
  


  // 2️⃣ If no token, return 401 Unauthorized
  if (!token) {
    return 
  }
  // if (!token) {
  //   return res.status(401).json({ message: "Access denied. No token provided." });
  // }

  try {
    // 3️⃣ Verify the token
    // console.log("Received Token:", token);
    // console.log("Decoded (without verifying):", jwt.decode(token));
    // console.log("SECRET KEY:", process.env.ACCESS_TOKEN_SECRET);
    
     
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('decoded= ', decoded)
    req.user = {};
    req.user.id = decoded.id || {}; // Attach user data to request
    console.log('decoded= ', decoded, 'req.user.id = ', req.user.id)
    next();
     // Move to the next middleware
  } catch (error) {
    // 4️⃣ Handle token expiration
    console.error("JWT Verification Error:", error); // Log the error
    return res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};

 


// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token if it is in localstorage

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
//     req.user = decoded; // Attach user data to request
//     next(); // Proceed to next middleware/controller
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };
