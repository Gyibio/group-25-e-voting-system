import mongoose, { Schema } from "mongoose";

export interface IElection extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "closed";
}

const ElectionSchema = new Schema<IElection>(
  {
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["upcoming", "active", "closed"],
      default: "upcoming",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Election ||
  mongoose.model<IElection>("Election", ElectionSchema);
