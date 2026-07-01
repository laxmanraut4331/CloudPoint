import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    fileUrl: { type: String, required: true },
    public_id: { type: String, required: true },

    fileType: {
      type: String,
      enum: ["images", "videos", "documents"],
      required: true,
    },
    fileSize: { type: Number, required: true },

    isFavorite: {
      type: Boolean,
      default: false,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true },
);

const FileModel = mongoose.model("File", fileSchema);
export default FileModel;
