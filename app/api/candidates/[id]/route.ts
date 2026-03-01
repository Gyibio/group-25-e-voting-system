import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Candidate from "@/models/Candidate";
import { requireSession, requireAdmin } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const forbidden = requireAdmin(session);
  if (forbidden) return forbidden;

  const { id } = await params;
  await dbConnect();

  const deleted = await Candidate.findByIdAndDelete(id);
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  const forbidden = requireAdmin(session);
  if (forbidden) return forbidden;

  const { id } = await params;
  await dbConnect();

  const data = await req.json();
  try {
    const updated = await Candidate.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 },
    );
  }
}
