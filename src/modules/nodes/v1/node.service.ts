import { NodeRepository } from "../../../repositories/node.repository";
import { NodeModel } from "../../../models/node.model";
import { AppError } from "../../../errors/AppError";
import httpStatus from "http-status";
import path from "path";
import fs from "fs";
import { NodeType } from "../../../constants/enum";

export class NodeService {
  constructor(private repo = new NodeRepository()) { }

  async _validateParentId(parentId: number | null) {
    if (parentId) {
      const parentNode = await this.repo.findById(parentId);
      if (!parentNode) {
        throw new AppError("Parent node not found", httpStatus.NOT_FOUND);
      };

      if (parentNode.type !== NodeType.FOLDER) {
        throw new AppError("Parent node must be a folder", httpStatus.BAD_REQUEST);
      };
    }
  }

  async _generateUpdatePayload(
    existingNode: NodeModel | undefined,
    data: Partial<NodeModel>,
    file?: Express.Multer.File
  ): Promise<Partial<NodeModel>> {

    const nodeType = data.type ?? existingNode?.type;

    if (!nodeType) {
      throw new AppError("Node type is required", httpStatus.BAD_REQUEST);
    }

    // ❌ Prevent changing type
    if (existingNode && data.type && data.type !== existingNode.type) {
      throw new AppError("Type cannot be changed", httpStatus.BAD_REQUEST);
    }

    // ✅ Validate parent change
    if (
      data.parent_id !== undefined &&
      data.parent_id !== existingNode?.parent_id
    ) {
      await this._validateParentId(data.parent_id);
    }

    // 📄 FILE rules
    if (nodeType === NodeType.FILE) {
      // Create file → file required
      if (!existingNode && !file) {
        throw new AppError("File is required", httpStatus.BAD_REQUEST);
      }

      return {
        ...data,
        ...(file && {
          name: file.originalname,
          path: file.path,
          size: file.size,
        }),
      };
    }

    // 📁 FOLDER
    return {
      ...data,
    };
  }

  async create(data: Partial<NodeModel>, file?: Express.Multer.File) {
    const payload = await this._generateUpdatePayload(undefined, data, file);

    return this.repo.create(payload);
  }

  async update(id: number, data: Partial<NodeModel>, file?: Express.Multer.File) {
    const node = await this.repo.findById(id);
    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    };

    const payload = await this._generateUpdatePayload(node, data, file);

    return this.repo.update(id, payload);
  }

  async deleteMany(ids: number[]) {
    if (!ids.length) {
      throw new AppError("ids cannot be empty", httpStatus.BAD_REQUEST);
    };

    await this.repo.deleteMany(ids);
  }

  async getDetail(id: number) {
    const node = await this.repo.findById(id);
    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    };

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
    };

    return node.path;
  }

  async deleteOne(id: number) {
    const node = await this.repo.findById(id);

    if (!node) {
      throw new AppError("Node not found", httpStatus.NOT_FOUND);
    };

    await this.repo.deleteOne(id);
  }
}
