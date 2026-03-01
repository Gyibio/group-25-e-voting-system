import VoteClient from "@/components/vote/VoteClient";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import Candidate, { ICandidate } from "@/models/Candidate";
import Vote from "@/models/Vote";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const session = await auth();
  if (!session) redirect("/");

  await dbConnect();

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

  // Collect all distinct positions for this election
  const allPositions = Array.from(new Set(candidates.map((c) => c.position)));

  // Find which positions the user has already voted for
  const existingVotes = await Vote.find({
    voter: session.user.id,
    election: id,
  }).lean();

  const votedPositions = new Set(existingVotes.map((v) => v.position));

  // Only redirect if the user has voted for ALL positions
  if (allPositions.length > 0 && allPositions.every((p) => votedPositions.has(p))) {
    redirect("/dashboard?alreadyVoted=true");
  }

  // Map previous votes to their candidate IDs so the UI can pre-select them
  const previousVotes: Record<string, string> = {};
  for (const v of existingVotes) {
    previousVotes[v.position] = String(v.candidate);
  }

  return (
    <VoteClient
      candidates={candidates}
      electionId={id}
      previousVotes={previousVotes}
    />
  );
};

export default Page;
