import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { generateNotes } from "../controllers/generate.controller.js";
import { getMyNotes, getSingleNote } from "../controllers/notes.controller.js";

const notesRouter = express.Router();

notesRouter.post("/generate-notes", authMiddleware, generateNotes);
notesRouter.get("/getNotes", authMiddleware, getMyNotes);
notesRouter.get("/:id", authMiddleware, getSingleNote);

export default notesRouter;
