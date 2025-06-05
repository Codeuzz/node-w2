import { Request, Response } from "express";
import { APIResponse } from "../utils";
import logger from "../utils/logger";
import { userModel } from "../models/users.model";
import { userRegisterValidation } from "../validations/user";
import { hashPassword } from "../utils/password";

const usersController = {
  getAll: async (req: Request, res: Response) => {
    try {
      logger.info("[GET] Récupérer tout les utilisateurs");
      const users = await userModel.getAll();
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
  create: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = userRegisterValidation.parse(
        req.body
      );
      const [emailAlreadyExists] = await userModel.getByEmail(email);
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

      const [newUser] = await userModel.create({
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

  getByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      logger.info("[GET] Récupérer un utilisateur");
      const user = await userModel.getByEmail(email);
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
};

export default usersController;
