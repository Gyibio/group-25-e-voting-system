import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Election from "@/models/Election";
import { requireSession, requireAdmin } from "@/lib/auth";

export async function GET() {
  await dbConnect();
  const elections = await Election.find();
  return NextResponse.json(elections);
}

export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const forbidden = requireAdmin(session);
  if (forbidden) return forbidden;

  await dbConnect();
  const data = await req.json();
  try {
    const election = await Election.create(data);
    return NextResponse.json(election, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
