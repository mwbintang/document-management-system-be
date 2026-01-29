import { createUsersTable } from "./001_create_users";
import { createNodesTable } from "./002_create_nodes";

async function migrate() {
  try {
    console.log("🚀 Running migrations...");

    await createUsersTable();
    await createNodesTable();

    console.log("🎉 Migration finished");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed", err);
    process.exit(1);
  }
}

migrate();
