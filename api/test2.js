import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { connectDB } from "./db.js";
import highscoreRoutes from "./test.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/highscores", highscoreRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res
    .status(500)
    .json({ error: "Internal Server Error", details: err.message });
});

export const handler = serverless(app);
