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
  get: (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[GET] Récupérer un post"); // Log d'information en couleur
      const post = { id: "uu5", content: "abc" }; // En attendant d'avoir un vrai model
      APIResponse(response, post, "OK");
    } catch (error: any) {
      logger.error("Erreur lors de la récupération du post: " + error.message);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du post",
        500
      );
    }
  },
  create: (request: Request, response: Response) => {
    try {
      const { content } = request.body;
      logger.info("[POST] Créer un post"); // Log d'information en couleur
      // Ici call du model pour créer un post TODO
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la récupération du post: " + error.message);
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du post",
        500
      );
    }
  },
  delete: (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[DELETE] Supprimer un post"); // Log d'information en couleur
      // Ici call du model pour delete un post TODO
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la suppression du post: " + error.message);
      APIResponse(response, null, "Erreur lors de la suppression du post", 500);
    }
  },
  update: (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[UPDATE] Update un post"); // Log d'information en couleur
      // Ici call du model pour update un post TODO
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la màj du post: " + error.message);
      APIResponse(response, null, "Erreur lors de la màj du post", 500);
    }
  },
  getAll: (request: Request, response: Response) => {
    try {
      logger.info("[GET] Récupérer tout les posts"); // Log d'information en couleur
      const posts = [
        {
          id: "uu5",
          content: "abc",
        },
        {
          id: "uu6",
          content: "def",
        },
      ]; // En attendant d'avoir un vrai model
      APIResponse(response, posts, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des posts: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération des posts",
        500
      );
    }
  },
};

export default postsController;
