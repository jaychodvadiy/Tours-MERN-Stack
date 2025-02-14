import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import dbConnect from "./config/db.js";
import authRoute from "./routes/authRouter.js";
import userRoute from "./routes/users.js";
import tourRoute from "./routes/tours.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is working");
});

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
