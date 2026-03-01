// lib/auth.ts
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { auth } from "@/auth";

// helper that returns a valid session or a NextResponse error
export async function requireSession(): Promise<Session | NextResponse> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  return session;
}

// returns null when allowed, otherwise a NextResponse error
export function requireAdmin(session: Session): NextResponse | null {
  if (session.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
