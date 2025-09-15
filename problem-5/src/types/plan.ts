export enum PlanStatus {
    DRAFT = "DRAFT",
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
}

export interface PlanUpdateInput {
    name?: string;
    budget?: number;
    status?: PlanStatus;
}
