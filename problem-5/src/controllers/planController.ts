import type { Request, Response } from "express";
import { PlanStatus } from "../types/plan.js";
import type { PlanUpdateInput } from "../types/plan.js";
import { planService } from "../services/planService.js";


export async function createPlan(req: Request, res: Response) {
    const { name, budget } = req.body ?? {};
    if (!name || typeof budget !== "number") {
        return res.status(400).json({ message: "name and budget are required" });
    }
    const plan = await planService.create(name, budget);
    return res.status(201).json(plan);
}


export async function listPlans(req: Request, res: Response) {
    const { status, name } = req.query as { status?: string; name?: string };
    const plans = await planService.list({ status, name });
    return res.json(plans);
}


export async function getPlan(req: Request, res: Response) {
    const id = Number(req.params.id);
    const plan = await planService.getById(id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    return res.json(plan);
}


export async function updatePlan(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body = (req.body ?? {}) as PlanUpdateInput;

    if (body.status && !Object.values(PlanStatus).includes(body.status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const plan = await planService.update(id, body);
        return res.json(plan);
    } catch {
        return res.status(404).json({ message: "Plan not found" });
    }
}

export async function deletePlan(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
        await planService.remove(id);
        return res.status(204).send();
    } catch {
        return res.status(404).json({ message: "Plan not found" });
    }
}
