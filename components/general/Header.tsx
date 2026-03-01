"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { useLC } from "./LoginContext";
import { ChartColumn, LogOut, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import SignOutDialog from "./SignOutDialog";
import { useSession } from "next-auth/react";

const Header = () => {
  const { setIsOpen, login, loading } = useLC();
  const [signOutOpen, setSignOutOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <SignOutDialog
        isOpen={signOutOpen}
        onClose={() => setSignOutOpen(false)}
      />
      <div className="w-full min-h-16 border-b border-dark/40 py-2 px-4 items-center justify-between flex flex-wrap gap-2">
        <div className="text-3xl font-bold text-primary">
          <Link href={"/"}>VoteUG</Link>
        </div>
        {loading ? (
          <div className="h-9 w-10 sm:w-40 rounded-lg bg-dark/10 animate-pulse" />
        ) : login ? (
          <div className="flex items-center divide-dark/50 divide-x flex-wrap gap-y-2">
            {session?.user?.role === "admin" && (
              <div className="flex pr-4 items-center">
                <Link href={"/admin"}>
                  <button className="flex gap-2 bg-bg hover:bg-secondary transition-colors p-2 text-dark/80 rounded-lg items-center">
                    <p className="text-sm font-medium hidden sm:block">Admin</p>
                    <ShieldCheck />
                  </button>
                </Link>
              </div>
            )}
            <div
              className={`flex items-center ${
                session?.user?.role === "admin" ? "px-4" : "pr-4"
              }`}
            >
              <Link href={"/results"}>
                <button className="flex gap-2 bg-bg hover:bg-secondary transition-colors p-2 text-dark/80 rounded-lg items-center">
                  <p className="text-sm font-medium hidden sm:block">Results</p>
                  <ChartColumn />
                </button>
              </Link>
            </div>
            <div className="flex pl-4 items-center">
              <div className="bg-primary-light mr-2 p-2 rounded-full">
                <User />
              </div>
              {/* session info can be fetched from useSession if needed */}
              <p className="text-sm mr-4 hidden sm:block max-w-40 truncate">
                {session?.user?.name}
              </p>
              <button onClick={() => setSignOutOpen(true)}>
                <LogOut />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <motion.button
              initial={{ borderColor: "#ffffff00", color: "#000000" }}
              whileHover={{ borderColor: "#e6b52a", color: "#e6b52a" }}
              transition={{
                duration: 0.2,
                ease: "linear",
              }}
              onClick={() => setIsOpen(true)}
              className="px-2 sm:px-4 py-2 sm:text-base text-xs rounded-lg font-medium bg-transparent border"
            >
              Sign In
            </motion.button>
            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary border border-primary"
            >
              Vote now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
