import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/utils/db.js";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";
import notesRouter from "./src/routes/generate.routes.js";
import pdfRouter from "./src/routes/pdf.route.js";
import creditRouter from "./src/routes/credits.route.js";
import { stripeWebhook } from "./src/controllers/credits.controller.js";

connectDB();

const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({
    message: "Ai notes backend is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credits", creditRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
