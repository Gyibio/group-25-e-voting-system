"use client";
import { motion } from "motion/react";
import { useLC } from "./LoginContext";
import { ChartColumn, LogOut, User } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { setIsOpen, user, login, setUser } = useLC();

  return (
    <div className="w-full h-16 border-b border-dark/40 py-2 px-4 items-center justify-between flex">
      <div className="text-3xl font-bold text-primary">
        <Link href={"/"}>E-UG</Link>
      </div>
      {login ? (
        <div className="flex items-center divide-dark/50 divide-x">
          <div className="flex pr-4 items-center">
            <Link href={"/results"}>
              <button className="flex gap-2 bg-bg hover:bg-secondary transition-colors p-2 text-dark/80 rounded-lg items-center">
                <p className="text-sm font-medium">Results</p>
                <ChartColumn />
              </button>
            </Link>
          </div>
          <div className="flex pl-4 items-center">
            <div className="bg-primary-light mr-2 p-2 rounded-full">
              <User />
            </div>
            <div className="flex flex-col mr-4 text-xs justify-center">
              <p>{user?.name}</p>
              <p className="text-black/60">{user?.id}</p>
            </div>
            <button
              onClick={() => {
                setUser(null);
                localStorage.clear();
              }}
            >
              <LogOut />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <motion.button
            initial={{ borderColor: "#ffffff00", color: "#000000" }}
            whileHover={{ borderColor: "#e6b52a", color: "#e6b52a" }}
            transition={{
              duration: 0.2,
              ease: "linear",
            }}
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-lg font-medium bg-transparent border"
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
  );
};

export default Header;
