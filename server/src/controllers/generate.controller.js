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

    if (!topic?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
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

    console.dir(aiGeneratedData, { depth: null });

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

    console.log("Note Created");
    console.log(newNote._id);

    user.credits -= 10;
    user.notes.push(newNote._id);

    await user.save();

    return res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    console.log("========== ERROR ==========");
    console.error(error);
    console.error(error.stack);

    if (error.errors) {
      console.dir(error.errors, { depth: null });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
