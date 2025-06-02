import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";

const commentsController = {
  getAll: (req: Request, res: Response) => {
    try {
      logger.info("[GET] Getting all comments");
      const comments = [
        { id: "uu5", content: "drole" },
        { id: "uu6", content: "pas aimé" },
      ];
      APIResponse(res, comments, "OK");
    } catch (error: any) {
      logger.error("Error getting comments: " + error.message);
      APIResponse(res, null, "Error getting comments", 500);
    }
  },
};

export default commentsController;
