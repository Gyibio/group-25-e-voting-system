"use client";
import React from "react";
import { motion } from "motion/react";

const How = () => {
  const parent = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 1 },
  };

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="w-full h-[50vh] grid grid-cols-3 px-8 py-8 gap-8"
    >
      <motion.div
        variants={child}
        className="flex flex-col border rounded-lg border-primary items-center justify-center"
      >
        <div className="size-10 flex mb-8 items-center justify-center text-primary text-xl border-primary border rounded-full">
          1
        </div>
        <p>Sign In</p>
        <p className="max-w-xs text-center">Login with your UG email</p>
      </motion.div>
      <motion.div
        variants={child}
        className="flex flex-col border rounded-lg border-primary items-center justify-center"
      >
        <div className="size-10 flex mb-8 items-center justify-center text-primary text-xl border-primary border rounded-full">
          2
        </div>
        <p>Select & Vote</p>
        <p className="max-w-xs text-center">
          Choose your candidates for each SRC position.
        </p>
      </motion.div>
      <motion.div
        variants={child}
        className="flex flex-col border rounded-lg border-primary items-center justify-center"
      >
        <div className="size-10 flex mb-8 items-center justify-center text-primary text-xl border-primary border rounded-full">
          3
        </div>
        <p>Confirm</p>
        <p className="max-w-xs text-center">
          Review your ballot and submit your encrypted vote.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default How;
