import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
  clicks: { type: Number, required: true },
  time: { type: String, required: true },
  cardCount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Highscore = mongoose.model("Highscore", highscoreSchema);
