import { Request, Response } from "express";
import { categoriesModel } from "../models/categories.model";
import logger from "../utils/logger";
import { APIResponse } from "../utils";

const categoriesController = {
  getAll: async (req: Request, res: Response) => {
    try {
      logger.info("[GET] Récupérer toutes les catégories");
      const all = await categoriesModel.getAll();
      APIResponse(res, all, "OK");
    } catch (error: any) {
      logger.error("Erreur getAll catégories : " + error.message);
      APIResponse(res, null, "Erreur récupération catégories", 500);
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      logger.info("[GET] Récupérer une catégorie");
      const { id } = req.params;
      const [cat] = await categoriesModel.getById(id);
      if (!cat) return APIResponse(res, null, "Catégorie introuvable", 404);
      APIResponse(res, cat, "OK");
    } catch (error: any) {
      logger.error("Erreur getById catégorie : " + error.message);
      APIResponse(res, null, "Erreur récupération catégorie", 500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      logger.info("[POST] Créer une catégorie");
      const { name } = req.body;
      const [newCat] = await categoriesModel.create(name);
      APIResponse(res, newCat, "Catégorie créée", 201);
    } catch (error: any) {
      logger.error("Erreur création catégorie : " + error.message);
      APIResponse(res, null, "Erreur création catégorie", 500);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      logger.info("[DELETE] Supprimer une catégorie");
      const { id } = req.params;
      const [deleted] = await categoriesModel.delete(id);
      if (!deleted) return APIResponse(res, null, "Catégorie introuvable", 404);
      APIResponse(res, deleted, "Catégorie supprimée", 200);
    } catch (error: any) {
      logger.error("Erreur suppression catégorie : " + error.message);
      APIResponse(res, null, "Erreur suppression catégorie", 500);
    }
  },
};

export default categoriesController;
