import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import api from "./routes/index.js";

export const app = express();

// Core middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

// Routes
app.use("/", api);


app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});
