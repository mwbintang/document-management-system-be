import { Router } from "express";
import { NodeController } from "./node.controller";

const router = Router();

router.get("/", NodeController.findAll);
router.get("/:id", NodeController.detail);
router.post("/", NodeController.create);
router.put("/:id", NodeController.update);
router.delete("/", NodeController.deleteMany);

export default router;
