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
                description: "CRUD API for Plan resource",
            },
            servers: [{ url: "http://localhost:3000" }],
            components: {
                schemas: {
                    Plan: {
                        type: "object",
                        properties: {
                            id: { type: "integer", example: 1 },
                            name: { type: "string", example: "Q4 Growth Plan" },
                            budget: { type: "number", example: 50000 },
                            status: {
                                type: "string",
                                enum: ["DRAFT", "RUNNING", "STOPPED"],
                                example: "DRAFT"
                            },
                            createdAt: { type: "string", format: "date-time" },
                            updatedAt: { type: "string", format: "date-time" }
                        },
                        required: ["id", "name", "budget", "status", "createdAt", "updatedAt"]
                    }
                }
            }
        },
        apis: ["./src/routes/*.ts"], // route files with @openapi annotations
    };

    const swaggerSpec = swaggerJSDoc(options);
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
