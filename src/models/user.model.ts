import { RowDataPacket } from "mysql2";

export interface UserModel extends RowDataPacket {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}