import { seedUsers } from "./001_users.seed";

async function seed() {
  try {
    console.log("🌱 Running seeders...");

    await seedUsers();

    console.log("🎉 Seeding finished");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seed();
