import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type { PlanUpdateInput } from "../types/plan.js";

export interface PlanFilters {
    status?: string;
    name?: string;
}

export const planService = {
    async create(name: string, budget: number) {
        return prisma.plan.create({ data: { name, budget } });
    },

    async list(filters: PlanFilters) {
        const { status, name } = filters;

        const where: Prisma.PlanWhereInput = {};
        if (status) {
            where.status = status;
        }
        if (name) {
            where.name = { contains: name };
        }

        return prisma.plan.findMany({
            where,
            orderBy: { id: "asc" },
        });
    },

    async getById(id: number) {
        return prisma.plan.findUnique({ where: { id } });
    },

    async update(id: number, patch: PlanUpdateInput) {
        return prisma.plan.update({
            where: { id },
            data: {
                ...(typeof patch.name === "string" && { name: patch.name }),
                ...(typeof patch.budget === "number" && { budget: patch.budget }),
                ...(typeof patch.status === "string" && { status: patch.status }),
            },
        });
    },

    async remove(id: number) {
        return prisma.plan.delete({ where: { id } });
    },
};
