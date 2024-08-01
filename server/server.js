import express from "express";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests from specific origins or all origins in development
    const allowedOrigins = [
      process.env.DEV_CLIENT_URL,
      process.env.PROD_CLIENT_URL,
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/api/v1", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
