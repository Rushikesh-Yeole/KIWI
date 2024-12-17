import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Define allowed origins for CORS
const allowedOrigins = ["http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins, // Allow requests from this origin
    credentials: true,      // Allow cookies or authorization headers
}));

// API Endpoints
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start the server
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
