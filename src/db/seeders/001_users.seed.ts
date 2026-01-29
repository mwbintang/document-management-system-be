import { pool } from "../connection";

export async function seedUsers() {
  await pool.query(`
    INSERT INTO users (username)
    VALUES
      ('admin')
  `);

  console.log("🌱 users seeded");
}
