import express, { Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';

import swaggerUi from "swagger-ui-express";

import swaggerFile from '../../../../swagger.json'

import '@shared/container';
import { AppError } from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
