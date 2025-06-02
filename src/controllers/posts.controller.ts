import { Request, Response } from "express";
import { APIResponse } from "../utils/response";

export const getAllPosts = (req: Request, res: Response) => {
  const posts = [
    { id: "uu5", content: "abc" },
    { id: "uu6", content: "def" },
  ];

  APIResponse(res, posts, "OK");
};
