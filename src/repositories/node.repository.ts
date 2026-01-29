import { pool } from "../db/connection";
import { NodeModel } from "../models/node.model";
import { offsetHandler } from "../utils/pagination";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface FindAllParams {
  parentId?: number | null;
  search?: string;
  page: number;
  limit: number;
}

export class NodeRepository {
  async create(data: Partial<NodeModel>): Promise<NodeModel | null> {
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO nodes
      (parent_id, type, name, path, description, size, created_by, updated_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.parent_id ?? null,
        data.type,
        data.name,
        data.path ?? null,
        data.description ?? null,
        data.size ?? null,
        data.created_by,
        data.updated_by,
      ]
    );

    return this.findById(result.insertId);
  }

  async update(id: number, data: Partial<NodeModel>): Promise<NodeModel | null> {
    await pool.query(
      `
      UPDATE nodes
      SET
        parent_id = ?,
        name = ?,
        path = ?,
        description = ?,
        size = ?,
        updated_by = ?
      WHERE id = ?
      `,
      [
        data.parent_id ?? null,
        data.name,
        data.path ?? null,
        data.description ?? null,
        data.size ?? null,
        data.updated_by,
        id,
      ]
    );

    return this.findById(id);
  }

  async deleteMany(ids: number[]): Promise<void> {
    if (!ids.length) return;

    await pool.query(
      `DELETE FROM nodes WHERE id IN (${ids.map(() => "?").join(",")})`,
      ids
    );
  }

  async findById(id: number): Promise<NodeModel | null> {
    const [rows] = await pool.query<RowDataPacket[] & NodeModel[]>(
      `SELECT * FROM nodes WHERE id = ?`,
      [id]
    );

    return rows[0] ?? null;
  }

  async findAll({
    parentId = null,
    search,
    page,
    limit,
  }: FindAllParams): Promise<NodeModel[]> {
    const offset = offsetHandler(page, limit);

    if (search) {
      const params: any[] = [];

      let parentCondition = "parent_id IS NULL";
      if (parentId !== null) {
        parentCondition = "parent_id = ?";
        params.push(parentId);
      }

      params.push(`%${search}%`, limit, offset);

      const [rows] = await pool.query<RowDataPacket[] & NodeModel[]>(
        `
        WITH RECURSIVE descendants AS (
          SELECT
            id,
            name,
            parent_id,
            id AS top_id
          FROM nodes
          WHERE ${parentCondition}

          UNION ALL

          SELECT
            n.id,
            n.name,
            n.parent_id,
            d.top_id
          FROM nodes n
          INNER JOIN descendants d ON n.parent_id = d.id
        )
        SELECT DISTINCT n.*
        FROM descendants d
        INNER JOIN nodes n ON n.id = d.top_id
        WHERE d.name LIKE ?
        ORDER BY n.created_at DESC
        LIMIT ? OFFSET ?
        `,
        params
      );

      return rows;
    }

    // Normal fetch (no search)
    const [rows] = await pool.query<RowDataPacket[] & NodeModel[]>(
      `
      SELECT *
      FROM nodes
      WHERE parent_id ${parentId === null ? "IS NULL" : "= ?"}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      parentId === null
        ? [limit, offset]
        : [parentId, limit, offset]
    );

    return rows;
  }
}
