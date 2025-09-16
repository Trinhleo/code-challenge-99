import { Router } from "express";
import {
    listPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
} from "../controllers/planController.js";

const router = Router();

/**
 * @openapi
 * /plans:
 *   get:
 *     summary: List all plans with filters & pagination
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, RUNNING, STOPPED]
 *         description: Filter by plan status
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by plan name substring
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Page size
 *     responses:
 *       200:
 *         description: Paginated list of plans
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Plan'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get("/", listPlans);

/**
 * @openapi
 * /plans/{id}:
 *   get:
 *     summary: Get details of a plan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single plan
 *       404:
 *         description: Plan not found
 */
router.get("/:id", getPlan);

/**
 * @openapi
 * /plans:
 *   post:
 *     summary: Create a plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, budget]
 *             properties:
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", createPlan);

/**
 * @openapi
 * /plans/{id}:
 *   put:
 *     summary: Update plan details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               budget:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put("/:id", updatePlan);

/**
 * @openapi
 * /plans/{id}:
 *   delete:
 *     summary: Delete a plan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete("/:id", deletePlan);

export default router;
