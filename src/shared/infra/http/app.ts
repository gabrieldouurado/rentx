import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@errors/AppError";

import swaggerFile from "../../../swagger.json";
import { createConnection } from "../typeorm";
import { router } from "./routes";

import "@shared/container";
import "@shared/container/providers";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error  - ${err.message}`,
    });
  }
);

export { app };
