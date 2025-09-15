import { Router } from "express";
import planRoutes from "./planRoutes.js";

const api = Router();

// mount routers theo prefix
api.use("/plans", planRoutes);

export default api;
