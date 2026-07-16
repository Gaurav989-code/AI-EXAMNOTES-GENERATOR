import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/utils/db.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Ai notes backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
