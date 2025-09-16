import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock } from "../tests/__mocks__/prismaMock.js";

// mock prisma BEFORE importing service
vi.mock("../lib/prisma.js", () => {
    return { prisma: prismaMock };
});

import { planService } from "./planService.js";
import { PlanStatus } from "../types/plan.js";

beforeEach(() => {
    vi.clearAllMocks();
});

describe("planService", () => {
    it("create() should call prisma.plan.create with correct data", async () => {
        prismaMock.plan.create.mockResolvedValue({
            id: 1,
            name: "Test",
            budget: 100,
            status: "DRAFT",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await planService.create("Test", 100);

        expect(prismaMock.plan.create).toHaveBeenCalledWith({
            data: { name: "Test", budget: 100 },
        });
        expect(result.id).toBe(1);
    });

    it("list() should return paginated results", async () => {
        prismaMock.plan.findMany.mockResolvedValue([
            { id: 1, name: "A", budget: 50, status: "DRAFT", createdAt: new Date(), updatedAt: new Date() },
        ]);
        prismaMock.plan.count.mockResolvedValue(1);

        const result = await planService.list({ status: "DRAFT", page: 1, pageSize: 10 });

        expect(prismaMock.plan.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { status: "DRAFT" },
                skip: 0,
                take: 10,
            })
        );
        expect(result.meta.total).toBe(1);
        expect(result.data[0]?.status).toBe("DRAFT");
    });

    it("getById() should call prisma.plan.findUnique", async () => {
        prismaMock.plan.findUnique.mockResolvedValue({
            id: 2,
            name: "B",
            budget: 200,
            status: "RUNNING",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await planService.getById(2);

        expect(prismaMock.plan.findUnique).toHaveBeenCalledWith({ where: { id: 2 } });
        expect(result?.status).toBe("RUNNING");
    });

    it("update() should call prisma.plan.update", async () => {
        prismaMock.plan.update.mockResolvedValue({
            id: 3,
            name: "C updated",
            budget: 300,
            status: "STOPPED",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const result = await planService.update(3, {
            name: "C updated",
            budget: 300,
            status: PlanStatus.STOPPED,
        });

        expect(prismaMock.plan.update).toHaveBeenCalledWith({
            where: { id: 3 },
            data: { name: "C updated", budget: 300, status: PlanStatus.STOPPED },
        });
        expect(result.status).toBe("STOPPED");
    });

    it("remove() should call prisma.plan.delete", async () => {
        prismaMock.plan.delete.mockResolvedValue({
            id: 4,
            name: "D",
            budget: 400,
            status: "DRAFT",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await planService.remove(4);

        expect(prismaMock.plan.delete).toHaveBeenCalledWith({ where: { id: 4 } });
    });
});
