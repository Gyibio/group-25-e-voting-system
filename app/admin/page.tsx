import Header from "@/components/general/Header";
import AdminClient from "@/components/admin/AdminClient";
import dbConnect from "@/lib/mongoose";
import Election from "@/models/Election";

export type AdminElection = {
  _id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "closed";
};

const AdminPage = async () => {
  await dbConnect();

  const raw = await Election.find().sort({ startDate: -1 }).lean();
  const elections: AdminElection[] = JSON.parse(JSON.stringify(raw));

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Panel</h1>
          <p className="text-sm text-dark/40">
            Manage elections and candidates.
          </p>
        </div>
        <AdminClient elections={elections} />
      </div>
    </div>
  );
};

export default AdminPage;
