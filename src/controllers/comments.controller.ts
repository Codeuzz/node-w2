import { Request, Response } from "express";
import { APIResponse } from "../utils/response";

export const getAllComments = (req: Request, res: Response) => {
  const comments = [
    { id: "uu5", content: "drole" },
    { id: "uu6", content: "pas aimé" },
  ];

  APIResponse(res, comments, "OK");
};
