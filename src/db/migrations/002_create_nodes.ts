import { pool } from "../connection";

export async function createNodesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS nodes (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      parent_id BIGINT NULL,
      type ENUM('FOLDER', 'FILE') NOT NULL,
      name VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      size BIGINT NULL,
      path VARCHAR(255) NULL,

      created_by BIGINT NOT NULL,
      updated_by BIGINT NOT NULL,

      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

      FOREIGN KEY (parent_id) REFERENCES nodes(id) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users(id),
      FOREIGN KEY (updated_by) REFERENCES users(id),

      INDEX idx_parent_id (parent_id),
      INDEX idx_type (type)
    )
  `);

  console.log("✅ nodes table created");
}
