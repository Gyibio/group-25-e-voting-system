import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Candidate from "@/models/Candidate";
import mongoose from "mongoose";
import { requireSession, requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const url = new URL(req.url);
  const electionId = url.searchParams.get("election");

  const filter: Record<string, unknown> = {};
  if (electionId) {
    filter.election = electionId;
  }

  const list = await Candidate.find(filter);
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const forbidden = requireAdmin(session);
  if (forbidden) return forbidden;

  await dbConnect();
  const data = await req.json();

  // ensure election is a valid ObjectId string
  if (typeof data.election === "string") {
    try {
      data.election = new mongoose.Types.ObjectId(data.election);
    } catch {
      return NextResponse.json(
        { error: "Invalid election id" },
        { status: 400 },
      );
    }
  }

  try {
    const doc = await Candidate.create(data);
    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    // ensure we only access message on actual Error
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
