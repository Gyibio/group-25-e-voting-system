/**
 * Drops the stale vote index and lets Mongoose recreate the correct one.
 * Run with: pnpm db:fix-indexes
 */

import mongoose from "mongoose";
import { config } from "dotenv";

config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI is not set.");
  process.exit(1);
}

async function fixIndexes() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI!);

  const col = mongoose.connection.collection("votes");
  const indexes = await col.indexes();
  console.log(
    "Current indexes:",
    indexes.map((i) => i.name),
  );

  const stale = ["voter_1_election_1"];
  for (const name of stale) {
    if (indexes.find((i) => i.name === name)) {
      await col.dropIndex(name);
      console.log(`  ✓ Dropped: ${name}`);
    } else {
      console.log(`  – Not found (already gone): ${name}`);
    }
  }

  console.log(
    "\n✅  Done. Restart the dev server so Mongoose recreates the correct index.",
  );
  await mongoose.disconnect();
}

fixIndexes().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
