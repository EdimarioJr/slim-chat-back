import { IController } from "@/presentation/protocols";

import { Request, Response } from "express";

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    console.log(httpResponse, "resposta");
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse);
    } else {
      res.status(httpResponse.statusCode).json(httpResponse);
    }
  };
};
