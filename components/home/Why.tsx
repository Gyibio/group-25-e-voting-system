"use client";
import {
  ChartColumn,
  CheckCircle,
  Clock,
  Shield,
  Users,
  Vote,
} from "lucide-react";
import { motion } from "motion/react";

const Why = () => {
  const whys = [
    {
      icon: <Shield />,
      title: "Secure & Encrypted",
      desc: "End-to-end encryption ensures every vote is protected and tamper-proof.",
    },
    {
      icon: <Users />,
      title: "One Student, One Vote",
      desc: "Verified student authentication guarantees fair participation.",
    },
    {
      icon: <ChartColumn />,
      title: "Instant Results",
      desc: "Automated tallying with results published within minutes of polls closing.",
    },
    {
      icon: <Clock />,
      title: "Vote Anytime",
      desc: "Cast your vote from anywhere — on or off campus — during the election window.",
    },
    {
      icon: <CheckCircle />,
      title: "Full Transparency",
      desc: "Immutable audit logs ensure complete accountability and trust.",
    },
    {
      icon: <Vote />,
      title: "Mobile-First",
      desc: "Optimized for phones — vote in just 3 simple steps.",
    },
  ];

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
    <div className="px-4 md:px-8">
      <div className="text-center my-10">
        <h1 className="text-2xl md:text-4xl font-bold">Why E-Voting?</h1>
        <p className="text-sm md:text-xl text-dark/60">
          A modern, secure approach to student democracy at the University of
          Ghana.
        </p>
      </div>
      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2"
      >
        {whys.map((w, i) => (
          <motion.div
            variants={child}
            key={i}
            className="p-6 border sm:block sm:text-left flex flex-col justify-center items-center text-center border-dark/20 shadow rounded-lg"
          >
            <div className="p-3 w-fit mb-4 bg-primary/15 text-primary rounded-lg">
              {w.icon}
            </div>
            <h1 className="text-xl font-bold">{w.title}</h1>
            <p className="text-dark/60">{w.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Why;
