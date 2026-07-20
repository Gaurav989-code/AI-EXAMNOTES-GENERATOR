import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { generateNotes } from "../controllers/generate.controller.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", authMiddleware, generateNotes);

export default notesRouter;
