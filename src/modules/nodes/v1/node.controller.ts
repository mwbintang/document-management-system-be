import { Request, Response, NextFunction } from "express";
import { NodeService } from "./node.service";
import httpStatus from "http-status";

const service = new NodeService();

export class NodeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const node = await service.create(req.body, req.file);
      res.status(httpStatus.CREATED).json(node);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const node = await service.update(id, req.body, req.file);
      res.status(httpStatus.NO_CONTENT).json(node);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMany(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      await service.deleteMany(ids);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (err) {
      next(err);
    }
  }

  static async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const node = await service.getDetail(id);
      res.status(httpStatus.OK).json(node);
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const search = req.query.search as string | undefined;

      const parentId =
        req.query.parentId === undefined
          ? undefined
          : req.query.parentId === "null"
          ? null
          : Number(req.query.parentId);

      const result = await service.findAll({
        page,
        limit,
        search,
        parentId,
      });

      res.status(httpStatus.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

   static async download(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const filePath = await service.downloadPath(id);

      res.download(filePath || "");
    } catch (err) {
      next(err);
    }
  }
}
