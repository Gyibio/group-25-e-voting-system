/**
 * Seeds the database with placeholder data for testing.
 * Run with: pnpm db:seed
 */

import mongoose from "mongoose";
import Election from "../models/Election";
import Candidate from "../models/Candidate";
import User from "../models/User";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set.");
  process.exit(1);
}

async function seed() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected.\n");

  // ── Users ──────────────────────────────────────────────────────────────────
  console.log("Seeding users…");
  await User.deleteMany({});
  await User.insertMany([
    { email: "admin@st.ug.edu.gh", name: "Admin User", role: "admin" },
    { email: "kofi.mensah@st.ug.edu.gh", name: "Kofi Mensah", role: "student" },
    { email: "ama.owusu@st.ug.edu.gh", name: "Ama Owusu", role: "student" },
    {
      email: "kwame.boateng@st.ug.edu.gh",
      name: "Kwame Boateng",
      role: "student",
    },
  ]);
  console.log("  ✓ Users");

  // ── Elections ──────────────────────────────────────────────────────────────
  console.log("Seeding elections…");
  await Election.deleteMany({});

  const [active, upcoming, closed] = await Election.insertMany([
    {
      title: "SRC General Elections 2025/2026",
      description:
        "Vote for your student representatives across all positions.",
      startDate: new Date("2026-02-20"),
      endDate: new Date("2026-03-15"),
      status: "active",
    },
    {
      title: "Faculty Rep Elections 2026",
      description: "Elect faculty-level representatives for the upcoming term.",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-05-10"),
      status: "upcoming",
    },
    {
      title: "JCRC Hall Elections 2025",
      description: "Junior Common Room Committee elections for all halls.",
      startDate: new Date("2025-11-01"),
      endDate: new Date("2025-11-20"),
      status: "closed",
    },
  ]);
  console.log("  ✓ Elections");

  // ── Candidates ─────────────────────────────────────────────────────────────
  console.log("Seeding candidates…");
  await Candidate.deleteMany({});

  await Candidate.insertMany([
    // Active election – President
    {
      name: "Nana Yaw Asante",
      position: "President",
      faculty: "Social Sciences",
      motto: "Unity, Progress, Excellence",
      election: active._id,
    },
    {
      name: "Efua Darko",
      position: "President",
      faculty: "Law",
      motto: "A voice for every student",
      election: active._id,
    },
    // Active election – Vice President
    {
      name: "Kojo Appiah",
      position: "Vice President",
      faculty: "Engineering Sciences",
      motto: "Innovation drives change",
      election: active._id,
    },
    {
      name: "Abena Frimpong",
      position: "Vice President",
      faculty: "Health Sciences",
      motto: "Your welfare is my priority",
      election: active._id,
    },
    // Active election – Financial Secretary
    {
      name: "Yaw Ofori",
      position: "Financial Secretary",
      faculty: "Business School",
      motto: "Transparency in every cedi",
      election: active._id,
    },
    {
      name: "Akosua Nyarko",
      position: "Financial Secretary",
      faculty: "Business School",
      motto: "Accountability first",
      election: active._id,
    },

    // Upcoming election – Faculty Rep
    {
      name: "Samuel Tetteh",
      position: "Faculty Representative",
      faculty: "Physical Sciences",
      motto: "Science for the people",
      election: upcoming._id,
    },
    {
      name: "Adwoa Sarpong",
      position: "Faculty Representative",
      faculty: "Arts",
      motto: "Amplifying student voices",
      election: upcoming._id,
    },

    // Closed election – JCRC
    {
      name: "Kwesi Acheampong",
      position: "Hall President",
      faculty: "Social Sciences",
      motto: "Service above self",
      election: closed._id,
    },
    {
      name: "Maame Agyei",
      position: "Hall President",
      faculty: "Education",
      motto: "Together we rise",
      election: closed._id,
    },
  ]);
  console.log("  ✓ Candidates");

  console.log("\n✅  Database seeded successfully.");
  console.log("\nElection IDs for testing:");
  console.log(`  active   → ${active._id}`);
  console.log(`  upcoming → ${upcoming._id}`);
  console.log(`  closed   → ${closed._id}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌  Seed error:", err);
  process.exit(1);
});
