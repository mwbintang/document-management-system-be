import mysql from "mysql2/promise";
import { env } from "../config/env";

export const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,

  waitForConnections: true,
  connectionLimit: 10,
});

export async function checkDbConnection() {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
}
