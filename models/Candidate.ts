import mongoose, { Schema } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  faculty: string;
  motto: string;
  photo?: string;
  election: Schema.Types.ObjectId;
}

const CandidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true },
    faculty: { type: String, required: true },
    motto: { type: String, required: true },
    photo: {
      type: String,
      validate: {
        validator: (v: string) => {
          try {
            new URL(v);
            return true;
          } catch {
            return false;
          }
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    election: { type: Schema.Types.ObjectId, ref: "Election", required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Candidate ||
  mongoose.model<ICandidate>("Candidate", CandidateSchema);
