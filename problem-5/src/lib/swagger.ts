import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

export function setupSwagger(app: Express) {
    const options: swaggerJSDoc.Options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Plan API",
                version: "1.0.0",
                description: "CRUD API for BusinessPlan resource",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        },
        apis: ["./src/routes/*.ts"], // path to route files with annotations
    };

    const swaggerSpec = swaggerJSDoc(options);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
