import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createCreditsOrder } from "../controllers/credits.controller.js";

const creditRouter = express.Router();

creditRouter.post("/order", authMiddleware, createCreditsOrder);

export default creditRouter;
