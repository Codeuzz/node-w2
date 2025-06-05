import { Request, Response } from "express";
import { APIResponse } from "../utils";
import logger from "../utils/logger";
import { booksModel } from "../models/books.model";
import { bookRegisterValidation } from "../validations/book";

const booksController = {
  getAll: async (req: Request, res: Response) => {
    try {
      logger.info("[GET] Récupérer tous les livres");
      const users = await booksModel.getAll();
      APIResponse(res, users, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des livres: " + error.message
      );
      APIResponse(res, null, "Erreur lors de la récupération des livres", 500);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`[GET] Récupérer le livre ${id}`);
      const user = await booksModel.getById(id);
      if (!user) return APIResponse(res, null, "Livre inexistant", 404);
      APIResponse(res, user, "OK", 200);
    } catch (error: any) {
      logger.error("Erreur lors de la récupération du livre: " + error.message);
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const {
        title,
        author,
        publishedYear,
        userId,
        // categoryId,
      } = bookRegisterValidation.parse(req.body);

      const [newBook] = await booksModel.create({
        title,
        author,
        // categoryId,
        userId,
        publishedYear,
      });

      logger.info("[POST] Créer un livre");
      APIResponse(res, newBook, "Vous avez créé le livre", 200);
    } catch (error: any) {
      logger.error("Erreur lors de la création du livre: " + error.message);
      APIResponse(res, null, "Erreur lors de la création du livre", 500);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`[DELETE] Supprimer le livre ${id}`);
      const deleted = await booksModel.delete(id);
      if (!deleted) return APIResponse(res, null, "Livre non trouvé", 404);
      APIResponse(res, deleted, "Livre supprimé");
    } catch (error: any) {
      logger.error("Erreur lors de la suppression du livre: " + error.message);
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },
};

export default booksController;
