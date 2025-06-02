import { Response } from "express";

export const APIResponse = (
  response: Response,
  data: object[],
  message: string,
  status = 200
) => {
  response.status(status).json({
    message,
    data,
  });
};
