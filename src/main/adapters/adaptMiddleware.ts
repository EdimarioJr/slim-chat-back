import { IMiddleware } from "@/presentation/protocols";

import { Request, Response, NextFunction } from "express";

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.["authorization"]?.split(" ")?.[1] ?? "",
      ...(req.headers || {}),
    };
    const httpResponse = await middleware.execute(request);

    if (httpResponse.statusCode === 200) {
      Object.assign(req, { body: { ...req.body, ...httpResponse.body } });
      next();
    } else {
      res.status(httpResponse.statusCode).json(httpResponse);
    }
  };
};
