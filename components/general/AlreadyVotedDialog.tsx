"use client";

import { X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

// Inner component — must be wrapped in <Suspense> because it calls useSearchParams()
const AlreadyVotedDialogInner = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Derive open state directly from the query param — no effect needed
  const isOpen = searchParams.get("alreadyVoted") === "true";

  const handleClose = () => {
    // Remove the query param — this causes isOpen to become false on the next render
    router.replace("/dashboard", { scroll: false });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="already-voted-modal"
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
              onClick={handleClose}
              className="absolute top-4 right-4"
              aria-label="Close"
            >
              <X />
            </button>

            <div className="flex flex-col items-center text-center gap-3">
              <div className="bg-primary-light p-4 rounded-full">
                <ShieldCheck className="text-primary w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                Vote Already Cast
              </h1>
              <p className="text-dark/70">
                You have already submitted your vote for this election. Each
                student may only vote once.
              </p>
            </div>

            <button onClick={handleClose} className="btn-primary w-full mt-6">
              Back to Dashboard
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Public export — Suspense boundary required by Next.js for useSearchParams in app router
const AlreadyVotedDialog = () => (
  <Suspense>
    <AlreadyVotedDialogInner />
  </Suspense>
);

export default AlreadyVotedDialog;
