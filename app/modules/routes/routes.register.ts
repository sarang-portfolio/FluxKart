import cors from "cors";
import { Application, NextFunction, Request, Response, json } from "express";
import helmet from "helmet";
import { ResponseHandler } from "../../utility/responseHandler";
import { routes } from "./routes.data";

export const registerRoutes = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(json());


  for (let route of routes) {
    app.use(route.path, route.router);
  }

  // Global error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
