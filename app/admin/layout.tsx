import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

// Every page under /admin checks that the logged-in user is an admin.
// Non-admins are sent back to the dashboard.
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session || session.user?.role !== "admin") redirect("/dashboard");

  return <>{children}</>;
}
