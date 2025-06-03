import { Request, Response } from "express";
import { APIResponse } from "../utils/response";
import logger from "../utils/logger";

const commentsController = {
  get: (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[GET] Récupérer un commentaire"); // Log d'information en couleur
      const comment = { id, content: "abc", postId: "uc5" }; // En attendant d'avoir un vrai model
      APIResponse(response, comment, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du commentaire: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du commentaire",
        500
      );
    }
  },
  create: (request: Request, response: Response) => {
    try {
      const { content, postId } = request.body;
      logger.info("[POST] Créer un commentaire"); // Log d'information en couleur
      // Ici call du model pour créer un commentaire TODO
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération du commentaire: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la récupération du commentaire",
        500
      );
    }
  },
  delete: (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[DELETE] Supprimer un commentaire"); // Log d'information en couleur
      // Ici call du model pour delete un commentaire TODO
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la suppression du commentaire: " + error.message
      );
      APIResponse(
        response,
        null,
        "Erreur lors de la suppression du commentaire",
        500
      );
    }
  },
  update: (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      logger.info("[UPDATE] Update un commentaire"); // Log d'information en couleur
      // Ici call du model pour update un commentaire TODO
      APIResponse(response, null, "OK", 201);
    } catch (error: any) {
      logger.error("Erreur lors de la màj du commentaire: " + error.message);
      APIResponse(response, null, "Erreur lors de la màj du commentaire", 500);
    }
  },
};

export default commentsController;
