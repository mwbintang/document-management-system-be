import { Router } from "express";
import { NodeController } from "./node.controller";
import { upload } from "../../../helpers/multer";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Nodes
 *   description: File & folder management
 */

/**
 * @swagger
 * /v1/nodes:
 *   get:
 *     summary: Get nodes list
 *     tags: [Nodes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: integer
 *           nullable: true
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [id, name, type, size, created_at]
 *           default: created_at
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", NodeController.findAll);

/**
 * @swagger
 * /v1/nodes/{id}:
 *   get:
 *     summary: Get node detail
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", NodeController.detail);

/**
 * @swagger
 * /v1/nodes/{id}/download:
 *   get:
 *     summary: Download file node
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: File download
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/:id/download", NodeController.download);

/**
 * @swagger
 * /v1/nodes:
 *   post:
 *     summary: Create node (file or folder)
 *     tags: [Nodes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [FILE, FOLDER]
 *               description:
 *                 type: string
 *               parent_id:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", upload.single("file"), NodeController.create);

/**
 * @swagger
 * /v1/nodes/{id}:
 *   put:
 *     summary: Update node
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               parent_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:id", upload.single("file"), NodeController.update);

/**
 * @swagger
 * /v1/nodes:
 *   delete:
 *     summary: Delete multiple nodes
 *     tags: [Nodes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/", NodeController.deleteMany);

/**
 * @swagger
 * /v1/nodes/{id}:
 *   delete:
 *     summary: Delete node by id
 *     tags: [Nodes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", NodeController.deleteOne);

export default router;
