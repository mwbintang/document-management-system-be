import { Router } from "express";
import nodeRoutes from "./modules/nodes/v1/node.route";

const router = Router();

router.use("/v1/nodes", nodeRoutes);

export default router;
