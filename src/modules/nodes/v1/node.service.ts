import { NodeRepository } from "../../../repositories/node.repository";
import { NodeModel } from "../../../models/node.model";
import { AppError } from "../../../errors/AppError";
import httpStatus from "http-status";
import path from "path";
import fs from "fs";

export class NodeService {
  constructor(private repo = new NodeRepository()) { }

  async create(data: Partial<NodeModel>, file?: Express.Multer.File) {
    if (!file) {
      throw new AppError("File is required", httpStatus.BAD_REQUEST);
    }

    return this.repo.create({ ...data, name: file.originalname, path: file.path, size: file.size });
  }

  async update(id: number, data: Partial<NodeModel>, file?: Express.Multer.File) {
    const node = await this.repo.findById(id);
    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    };

    if (!file) {
      throw new AppError("File is required", httpStatus.BAD_REQUEST);
    }

    return this.repo.update(id, { ...data, name: file.originalname, path: file.path, size: file.size });
  }

  async deleteMany(ids: number[]) {
    if (!ids.length) {
      throw new AppError("ids cannot be empty", httpStatus.BAD_REQUEST);
    }

    await this.repo.deleteMany(ids);
  }

  async getDetail(id: number) {
    const node = await this.repo.findById(id);
    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    }

    return node;
  }

  async findAll(params: {
    page: number;
    limit: number;
    search?: string;
    parentId?: number | null;
  }) {
    return this.repo.findAll(params);
  };

  async downloadPath(id: number) {
    const node = await this.repo.findById(id);
    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    };

    const absolutePath = path.resolve(node.path || "");

    if (!fs.existsSync(absolutePath)) {
      throw new AppError("File not found", httpStatus.NOT_FOUND);
    }

    return node.path;
  }
}
