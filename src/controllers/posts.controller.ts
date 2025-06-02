import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";

export const getAllPosts = (req: Request, res: Response) => {
  const posts = [
    { id: "uu5", content: "abc" },
    { id: "uu6", content: "def" },
  ];

  APIResponse(res, posts, "OK");
};

const postsController = {
  getAll: (req: Request, res: Response) => {
    try {
      logger.info("[GET] Getting every posts");
      const posts = [
        { id: "uu5", content: "abc" },
        { id: "uu6", content: "def" },
      ];
      APIResponse(res, posts, "OK");
    } catch (error: any) {
      logger.error("Error getting every posts: " + error.message);
      APIResponse(res, null, "Error getting all posts", 500);
    }
  },
};

export default postsController;
