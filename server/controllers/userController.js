import User from "../models/userSchema.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    console.log('getCurrentUser = ', user)
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};




// export const getUser = async (req, res) => {
//   try {
//     const userId = req.user.id; // Retrieved from decoded token (authMiddleware.js)
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user); // Send user data to frontend
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
