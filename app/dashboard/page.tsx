import ElectionCard from "@/components/dashboard/ElectionCard";
import Greeting from "@/components/dashboard/Greeting";
import Header from "@/components/general/Header";
import AlreadyVotedDialog from "@/components/general/AlreadyVotedDialog";
import dbConnect from "@/lib/mongoose";
import Election, { IElection } from "@/models/Election";

// const elections = [
//   {
//     status: "active" as const,
//     title: "SRC General Elections 2025/2026",
//     description: "Vote for your student representatives across all positions.",
//     endingDate: new Date("2026-03-15"),
//     positions: 8,
//     candidates: 24,
//   },
//   {
//     status: "upcoming" as const,
//     title: "Faculty Rep Elections 2026",
//     description: "Elect faculty-level representatives for the upcoming term.",
//     endingDate: new Date("2026-05-01"),
//     positions: 5,
//     candidates: 15,
//   },
//   {
//     status: "completed" as const,
//     title: "JCRC Hall Elections 2025",
//     description: "Junior Common Room Committee elections for all halls.",
//     endingDate: new Date("2025-11-20"),
//     positions: 6,
//     candidates: 18,
//   },
// ];

const page = async () => {
  await dbConnect();

  let elections: IElection[];

  try {
    // Sort active → upcoming → closed, then by most recent startDate within each group
    elections = await Election.aggregate([
      {
        $addFields: {
          _statusOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", "active"] }, then: 0 },
                { case: { $eq: ["$status", "upcoming"] }, then: 1 },
                { case: { $eq: ["$status", "closed"] }, then: 2 },
              ],
              default: 3,
            },
          },
        },
      },
      { $sort: { _statusOrder: 1, startDate: -1 } },
      { $unset: "_statusOrder" },
    ]);
  } catch (err) {
    throw new Error(
      `Failed to load elections: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  return (
    <div>
      <AlreadyVotedDialog />
      <Header />
      <div className="py-8 px-6">
        <Greeting />
        <div className="space-y-4 pt-8">
          {elections.map((e: IElection) => (
            <ElectionCard key={e.title} election={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
