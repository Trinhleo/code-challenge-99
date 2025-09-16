import { Router } from "express";
import planRoutes from "./planRoutes.js";

const api = Router();

api.use("/plans", planRoutes);

export default api;
