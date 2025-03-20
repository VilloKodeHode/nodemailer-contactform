import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongoURI: process.env.MONGODB_URI,
};
