import { NodeRepository } from "../../../repositories/node.repository";
import { NodeModel } from "../../../models/node.model";
import { AppError } from "../../../errors/AppError";
import httpStatus from "http-status";

export class NodeService {
  constructor(private repo = new NodeRepository()) {}

  async create(data: Partial<NodeModel>) {
    return this.repo.create(data);
  }

  async update(id: number, data: Partial<NodeModel>) {
    const node = await this.repo.findById(id);
    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    };

    return this.repo.update(id, data);
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
  }
}
