import UserModel from "../models/user.model.js";
import NotesModel from "../models/notes.model.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.service.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic subject is required to generate AI notes.",
      });
    }

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile context not found.",
      });
    }

    if (user.credits < 10) {
      user.isCreditsAvailable = false;
      await user.save();
      return res.status(403).json({
        success: false,
        message: "Insufficient credits. Please upgrade your balance plan.",
      });
    }

    const formattedPrompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    const aiGeneratedData = await generateGeminiResponse(formattedPrompt);

    const newNote = await NotesModel.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeCharts: includeChart,
      content: aiGeneratedData,
    });

    user.credits -= 10;
    if (user.credits <= 0) {
      user.isCreditsAvailable = false;
    }

    if (!Array.isArray(user.notes)) {
      user.notes = []; 
    }
    user.notes.push(newNote._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "AI notes compiled successfully.",
      noteId: newNote._id, 
      creditsLeft: user.credits,
      data: newNote,
    });

  } catch (error) {
    console.error("Critical Generation Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred processing request.",
      error: error.message,
    });
  }
};
