/**
 * Promotes a user to admin by email.
 * Run with: pnpm db:make-admin <email>
 */

import mongoose from "mongoose";
import User from "../models/User";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set.");
  process.exit(1);
}

const email = process.argv[2];
if (!email) {
  console.error("❌  Usage: pnpm db:make-admin <email>");
  process.exit(1);
}

async function run() {
  console.log(`Connecting to MongoDB…`);
  await mongoose.connect(MONGODB_URI!);
  console.log("Connected.\n");

  const res = await User.updateOne(
    { email },
    { $set: { role: "admin" } },
    { upsert: false },
  );

  if (res.matchedCount === 0) {
    console.warn(
      `⚠️  No user found with email "${email}".\n` +
        `   They need to log in at least once before being promoted.`,
    );
  } else {
    console.log(`✅  "${email}" is now an admin.`);
  }

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
