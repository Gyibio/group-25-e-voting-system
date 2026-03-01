import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(function proxy(req) {
  const { nextUrl, auth: session } = req;

  // Allow the homepage and all auth callbacks through unconditionally
  const isPublic =
    nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/api/auth");

  if (!isPublic && !session) {
    // Redirect unauthenticated users back to the homepage
    return NextResponse.redirect(new URL("/", nextUrl));
  }
});

export const config = {
  // Run on every route except Next.js internals and static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.gif$|.*\\.webp$|.*\\.ico$).*)",
  ],
};
