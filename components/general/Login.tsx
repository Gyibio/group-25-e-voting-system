"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLC } from "./LoginContext";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const { isOpen, setIsOpen, login, setUser: setContextUser } = useLC();

  const [user, setUser] = useState({ id: "", name: "Test" });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="login-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-full top-0 z-10 fixed bg-black/10 backdrop-blur-xs flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white border rounded-lg w-150 relative border-primary p-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-primary">E-UG</h1>
              <p className="text-xl font-bold mt-4">Student Sign In</p>
              <p>Use your UG credentials to access the voting portal.</p>
            </div>
            <form className="mt-5 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="id">Student ID</label>
                <input
                  className="border border-primary rounded-lg px-4 py-2"
                  type="text"
                  onChange={(e) => {
                    setUser((prev) => ({ ...prev, id: e.target.value }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  className="border border-primary rounded-lg px-4 py-2"
                  type="text"
                />
              </div>
              <Link href={login ? "/dashboard" : ""}>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setContextUser(user); // update context state
                    // localStorage sync is handled automatically by provider
                  }}
                >
                  Continue
                </button>
              </Link>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
