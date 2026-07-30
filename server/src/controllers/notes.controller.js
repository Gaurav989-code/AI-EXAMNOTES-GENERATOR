import NotesModel from "../models/notes.model.js";

// --- FETCH ALL NOTES METADATA FOR USER ---
export const getMyNotes = async (req, res) => {
  try {
    const userId = req.user?._id || req.user;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const notes = await NotesModel.find({ user: userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        error: "No notes found for this account",
      });
    }

    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes metadata:", error);

    return res.status(500).json({
      error: "Failed to fetch notes history log.",
      details: error.message,
    });
  }
};

// --- FETCH SINGLE EXPANDED NOTE DETAIL ---
export const getSingleNote = async (req, res) => {
  try {
    const userId = req.user?._id || req.user;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const note = await NotesModel.findOne({
      _id: req.params.id,
      user: userId,
    });

    if (!note) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    return res.status(200).json({
      content: note.content,
      topic: note.topic,
      createdAt: note.createdAt,
    });
  } catch (error) {
    console.error("Error retrieving detailed note object profile:", error);

    return res.status(500).json({
      error: "Failed to fetch detailed note record.",
      details: error.message,
    });
  }
};
