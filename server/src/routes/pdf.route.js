import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { pdfDownload } from "../controllers/pdf.controller.js";

const pdfRouter = express.Router();

pdfRouter.post("/generate-pdf", authMiddleware, pdfDownload);

export default pdfRouter;
