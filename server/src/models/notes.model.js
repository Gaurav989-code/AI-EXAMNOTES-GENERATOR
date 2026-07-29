import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    classLevel: {
      type: String,
      default: "Not specified",
      trim: true,
    },

    examType: {
      type: String,
      default: "General",
      trim: true,
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
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

notesSchema.index({ user: 1, topic: 1 });

const NotesModel = mongoose.model("NotesModel", notesSchema);

export default NotesModel;
