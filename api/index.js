import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import issueRoutes from "./routes/issues.route.js";
// import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());



// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

//routes
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/issues",issueRoutes);

//Middleware and a function to handle errors
app.use((err,req,res,next)=> {
  const statusCode = err.statusCode || 500; //500 -internal server error
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
  });
});