// server/server.js
import dotenv            from 'dotenv'
import express           from 'express'
import authRoutes        from './routes/authRoutes.js'
import userRoutes        from './routes/userRoutes.js'
import doctorRoutes      from './routes/doctorRoutes.js'
import cors              from 'cors'
import cookieParser      from 'cookie-parser'
import mongoose          from 'mongoose'
import appointmentRoutes from './routes/appointmentRoutes.js'

const app = express();
app.use(cookieParser())
dotenv.config()
app.use(express.json());
//app.use(express.urlencoded({ extended: true })); 

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5000"
app.use(cors({
  origin: "http://localhost:5000", // React frontend URL
  credentials: true // REQUIRED for cookies to be sent
  
}));

app.get('/test', (req, res)=>{
  res.json('test ok')
}) 

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
  
  app.use("/api/auth", authRoutes)
  app.use("/api/user", userRoutes)
  app.use("/api/appointments", appointmentRoutes)
  app.use("/api/doctors", doctorRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
