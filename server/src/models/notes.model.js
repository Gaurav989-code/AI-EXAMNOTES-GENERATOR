import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: [true, "User reference is required"],
    },
    topic: {
      type: String,
      required: [true, "Topic title is required"],
      trim: true,
    },
    classLevel: {
      type: String,
      default: "Not specified",
    },
    examType: {
      type: String,
      default: "General",
    },
    revisionMode: {
      type: Boolean,
      default: false,
    },
    includeDiagram: {
      type: Boolean,
      default: false,
    },
    includeCharts: {
      type: Boolean,
      default: false,
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Note content structure is required"],
    },
  },
  {
    timestamps: true,
  },
);

notesSchema.index({ user: 1, topic: 1 });

const NotesModel = mongoose.model("NotesModel", notesSchema);
export default NotesModel;
