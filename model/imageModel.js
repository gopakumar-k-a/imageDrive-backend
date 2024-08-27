import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    images: {
      type: [
        {
          imageName: String,
          title: String,
        },
      ],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
imageSchema.index({ userId: 1 });
export const Image = mongoose.model("Image", imageSchema);
