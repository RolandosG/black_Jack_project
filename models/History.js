import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Black Jack",
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      enum: ["win", "lost", "draw"],
      default: "win",
    },

    currentBet: {
      type: String,
    },

    gameLocation: {
      type: String,
      default: "Toronto",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("History", HistorySchema);
