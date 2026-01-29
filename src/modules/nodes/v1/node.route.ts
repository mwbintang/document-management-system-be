import { Router } from "express";
import { NodeController } from "./node.controller";
import { upload } from "../../../helpers/multer";

const router = Router();

router.get("/", NodeController.findAll);
router.get("/:id", NodeController.detail);
router.get("/:id/download", NodeController.download);
router.post("/", upload.single("file"), NodeController.create);
router.put("/:id", upload.single("file"), NodeController.update);
router.delete("/", NodeController.deleteMany);

export default router;
