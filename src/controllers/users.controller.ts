import { Request, Response } from "express";
import { APIResponse } from "../utils";
import logger from "../utils/logger";
import { usersModel } from "../models/users.model";
import { userRegisterValidation } from "../validations/user";
import { hashPassword } from "../utils/password";

const usersController = {
  getAll: async (req: Request, res: Response) => {
    try {
      logger.info("[GET] Récupérer tout les utilisateurs");
      const users = await usersModel.getAll();
      APIResponse(res, users, "OK");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération des utilisateurs: " + error.message
      );
      APIResponse(
        res,
        null,
        "Erreur lors de la récupération des utilisateurs",
        500
      );
    }
  },

  getByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      logger.info("[GET] Récupérer un utilisateur");
      const user = await usersModel.getByEmail(email);
      if (!user) return APIResponse(res, null, "utilisateur inexistant", 404);
      APIResponse(res, user, "OK");
    } catch (err: any) {
      logger.error(
        "Erreur lors de la récupération de l'utilisateur: " + err.message
      );
      APIResponse(
        res,
        null,
        "Erreur lors de la récupération de l'utilisateur",
        500
      );
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`[GET] Récupérer l'utilisateur ${id}`);
      const user = await usersModel.getById(id);
      if (!user) return APIResponse(res, null, "Utilisateur inexistant", 404);
      APIResponse(res, user, "OK", 200);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la récupération de l'utilisateur: " + error.message
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = userRegisterValidation.parse(
        req.body
      );
      const [emailAlreadyExists] = await usersModel.getByEmail(email);
      if (emailAlreadyExists) {
        return APIResponse(
          res,
          null,
          "Cette adresse email est déjà utilisée",
          400
        );
      }

      const hash = await hashPassword(password);
      if (!hash) {
        return APIResponse(
          res,
          null,
          "Un problème est survenu lors du hash",
          500
        );
      }

      const [newUser] = await usersModel.create({
        username,
        email,
        password: hash,
      });
      if (!newUser) {
        return APIResponse(res, null, "Un problème est survenu", 500);
      }

      logger.info("[POST] Créer un utilisateur");
      APIResponse(res, newUser, "Vous êtes inscrit", 200);
    } catch (error: any) {
      logger.error(
        "Erreur lors de la création de l'utilisateur: " + error.message
      );
      APIResponse(
        res,
        null,
        "Erreur lors de la création de l'utilisateur",
        500
      );
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      logger.info(`[DELETE] Supprimer l'utilisateur ${id}`);
      const deleted = await usersModel.delete(id);
      if (!deleted)
        return APIResponse(res, null, "Utilisateur non trouvé", 404);
      APIResponse(res, deleted, "Utilisateur supprimé");
    } catch (error: any) {
      logger.error(
        "Erreur lors de la suppression de l'utilisateur: " + error.message
      );
      APIResponse(res, null, "Erreur serveur", 500);
    }
  },
};

export default usersController;
