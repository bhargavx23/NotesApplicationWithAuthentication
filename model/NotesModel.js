import mongoose from "mongoose";

const notesModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notesusers",
      required: true,
    },
  },
  { timestamps: true },
);

export const NotesModel = mongoose.model("notes", notesModelSchema);
