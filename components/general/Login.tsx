"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLC } from "./LoginContext";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { isOpen, setIsOpen } = useLC();
  const { status } = useSession();

  // close dialog when authentication succeeds
  useEffect(() => {
    if (status === "authenticated") {
      setIsOpen(false);
    }
  }, [status, setIsOpen]);

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
            className="bg-white border rounded-lg w-full max-w-lg mx-4 relative border-primary p-6 md:p-8"
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
              <p>Use your UG Microsoft account to access the voting portal.</p>
            </div>
            <div className="mt-5 space-y-4">
              <button
                className="btn-primary w-full"
                onClick={() => signIn("microsoft-entra-id")}
              >
                Continue with Microsoft
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;
