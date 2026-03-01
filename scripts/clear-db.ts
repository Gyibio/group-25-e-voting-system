/**
 * Clears all collections in the database.
 * Run with: npx tsx scripts/clear-db.ts
 */

import mongoose from "mongoose";
import * as readline from "readline";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set in your environment.");
  process.exit(1);
}

async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y");
    });
  });
}

async function clearDb() {
  const yes = await confirm(
    "⚠️  This will delete ALL data in every collection. Continue? (y/N) ",
  );

  if (!yes) {
    console.log("Aborted.");
    process.exit(0);
  }

  console.log("Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);

  const db = mongoose.connection.db;
  if (!db) {
    console.error("❌  Could not access the database.");
    process.exit(1);
  }

  const collections = await db.listCollections().toArray();

  if (collections.length === 0) {
    console.log("No collections found – nothing to clear.");
  } else {
    for (const col of collections) {
      await db.collection(col.name).deleteMany({});
      console.log(`  ✓ Cleared: ${col.name}`);
    }
    console.log("\n✅  Database cleared.");
  }

  await mongoose.disconnect();
}

clearDb().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
