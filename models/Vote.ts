import mongoose, { Document, Schema } from "mongoose";

export interface IVote extends Document {
  voter: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  election: mongoose.Types.ObjectId;
  position: string;
}

const VoteSchema = new Schema<IVote>(
  {
    voter: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    candidate: {
      type: mongoose.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    election: {
      type: mongoose.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    position: { type: String, required: true },
  },
  { timestamps: true },
);

// one vote per user per position per election
VoteSchema.index({ voter: 1, election: 1, position: 1 }, { unique: true });

export default mongoose.models.Vote ||
  mongoose.model<IVote>("Vote", VoteSchema);
