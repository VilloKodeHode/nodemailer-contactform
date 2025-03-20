import express from "express";
import { Highscore } from "./mongooseSchema.js";

const router = express.Router();

// Get highscores
router.get("/", async (req, res, next) => {
  try {
    const highscores = await Highscore.find().sort({ score: -1 }).limit(30);
    res.json(highscores);
  } catch (error) {
    next(error); // Passes error to error handler middleware
  }
});

// Create a new highscore
router.post("/", async (req, res, next) => {
  try {
    const { playerName, score, clicks, time, cardCount } = req.body;

    if (!playerName || !score || !clicks || !time || !cardCount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newHighscore = new Highscore(req.body);
    await newHighscore.save();
    res.status(201).json(newHighscore);
  } catch (error) {
    next(error);
  }
});

export default router;
