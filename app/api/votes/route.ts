import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Vote from "@/models/Vote";
import { requireSession } from "@/lib/auth";

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  await dbConnect();
  const list = await Vote.find();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  await dbConnect();
  const data = await req.json();

  // always use the authenticated user as the voter — never trust client input
  data.voter = session.user.id;

  try {
    const doc = await Vote.create(data);
    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
