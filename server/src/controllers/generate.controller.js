import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import NotesModel from "../models/notes.model.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.service.js";

export const generateNotes = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

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
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Topic is required.",
      });
    }

    const user = await UserModel.findById(req.userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.credits < 10) {
      user.isCreditsAvailable = false;
      await user.save({ session });
      await session.commitTransaction();
      session.endSession();
      return res.status(403).json({
        success: false,
        message: "Insufficient credits.",
      });
    }

    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    console.log("Generating notes...");
    const aiGeneratedData = await generateGeminiResponse(prompt);
    console.log("Gemini Success");

    const [newNote] = await NotesModel.create(
      [
        {
          user: user._id,
          topic,
          classLevel,
          examType,
          revisionMode,
          includeDiagram,
          includeChart,
          content: aiGeneratedData,
        },
      ],
      { session },
    );
    console.log("Note Created");

    user.credits -= 10;
    if (user.credits <= 0) {
      user.isCreditsAvailable = false;
    }

    if (!Array.isArray(user.newNote)) {
      user.newNote = [];
    }

    user.newNote.push(newNote._id); 
    await user.save({ session });
    console.log("User Updated");

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Notes generated successfully.",
      data: aiGeneratedData,
      noteId: newNote._id, 
      creditsLeft: user.credits,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("========== ERROR ==========");
    console.error(error);
    console.error("===========================");

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// export const generateNotes = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const {
//       topic,
//       classLevel,
//       examType,
//       revisionMode,
//       includeDiagram,
//       includeChart,
//     } = req.body;

//     if (!topic?.trim()) {
//       await session.abortTransaction();
//       return res.status(400).json({
//         success: false,
//         message: "Topic is required.",
//       });
//     }

//     const user = await UserModel.findById(req.userId).session(session);

//     if (!user) {
//       await session.abortTransaction();
//       return res.status(404).json({
//         success: false,
//         message: "User not found.",
//       });
//     }

//     if (user.credits < 10) {
//       await session.abortTransaction();

//       return res.status(403).json({
//         success: false,
//         message: "Insufficient credits.",
//       });
//     }

//     const prompt = buildPrompt({
//       topic,
//       classLevel,
//       examType,
//       revisionMode,
//       includeDiagram,
//       includeChart,
//     });

//     console.log("Generating notes...");

//     const aiGeneratedData = await generateGeminiResponse(prompt);

//     console.log("Gemini Success");

//     const newNote = await NotesModel.create(
//       [
//         {
//           user: user._id,
//           topic,
//           classLevel,
//           examType,
//           revisionMode,
//           includeDiagram,
//           includeCharts: includeChart,
//           content: aiGeneratedData,
//         },
//       ],
//       { session },
//     );

//     console.log("Note Created");

//     user.credits -= 10;
//     user.notes.push(newNote[0]._id);

//     await user.save({ session });

//     console.log("User Updated");

//     await session.commitTransaction();

//     return res.status(201).json({
//       success: true,
//       message: "Notes generated successfully.",
//       creditsLeft: user.credits,
//       data: newNote[0],
//     });
//   } catch (error) {
//     await session.abortTransaction();

//     console.error("========== ERROR ==========");
//     console.error(error);
//     console.error("===========================");

//     return res.status(500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   } finally {
//     session.endSession();
//   }
// };
