"use client";

import { X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { signOut } from "next-auth/react";

interface SignOutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignOutDialog = ({ isOpen, onClose }: SignOutDialogProps) => {
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sign-out-modal"
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
              onClick={onClose}
              className="absolute top-4 right-4"
              aria-label="Close"
            >
              <X />
            </button>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="bg-primary-light p-4 rounded-full">
                <LogOut className="text-primary w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Sign Out</h1>
              <p className="text-dark/70">
                Are you sure you want to sign out of your UG account?
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="w-full py-2 px-4 rounded-lg border border-dark/30 font-medium hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button onClick={handleSignOut} className="btn-primary w-full">
                Sign Out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignOutDialog;
