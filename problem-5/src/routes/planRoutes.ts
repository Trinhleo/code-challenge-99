import { Router } from "express";
import {
    listPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
} from "../controllers/planController.js";

const router = Router();

router.get("/", listPlans);
router.get("/:id", getPlan);
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
