import VoteClient from "@/components/vote/VoteClient";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import Candidate, { ICandidate } from "@/models/Candidate";
import Vote from "@/models/Vote";
import { redirect } from "next/navigation";

export type candidateT = ICandidate;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const session = await auth();
  if (!session) redirect("/");

  await dbConnect();

  // if the user has already cast any vote in this election, send them back
  const existingVote = await Vote.findOne({
    voter: session.user.id,
    election: id,
  }).lean();

  if (existingVote) redirect("/dashboard?alreadyVoted=true");

  let candidates: ICandidate[];
  try {
    const raw = await Candidate.find({ election: id }).lean();
    // ObjectId fields aren't serialisable — convert to plain JSON-safe objects
    candidates = JSON.parse(JSON.stringify(raw));
  } catch (err) {
    throw new Error(
      `Failed to load candidates: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  return <VoteClient candidates={candidates} electionId={id} />;
};

export default Page;
