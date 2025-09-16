import { prisma } from "../lib/prisma.js";
import type { Prisma } from "@prisma/client";
import type { PlanUpdateInput } from "../types/plan.js";

export interface PlanFilters {
    status?: string;
    name?: string;
    page?: number;
    pageSize?: number;
}

export const planService = {
    async create(name: string, budget: number) {
        return prisma.plan.create({ data: { name, budget } });
    },

    async list(filters: PlanFilters) {
        const { status, name, page = 1, pageSize = 10 } = filters;

        const where: Prisma.PlanWhereInput = {};
        if (status) where.status = status;
        if (name) where.name = { contains: name };

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const [items, total] = await Promise.all([
            prisma.plan.findMany({
                where,
                orderBy: { id: "asc" },
                skip,
                take,
            }),
            prisma.plan.count({ where }),
        ]);

        return {
            data: items,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
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
