import { RowDataPacket } from "mysql2";

export interface NodeModel extends RowDataPacket {
  id: number;
  parent_id: number | null;
  type: "FOLDER" | "FILE";

  name: string;
  path: string | null;
  description: string | null;
  size: number | null;

  created_by: number;
  updated_by: number;

  created_at: Date;
  updated_at: Date;
}
