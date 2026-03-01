import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { requireSession, requireAdmin } from "@/lib/auth";

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const forbidden = requireAdmin(session);
  if (forbidden) return forbidden;

  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const forbidden = requireAdmin(session);
  if (forbidden) return forbidden;

  await dbConnect();
  const data = await req.json();
  try {
    const doc = await User.create(data);
    return NextResponse.json(doc, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
