import { Request, Response } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

import { APIResponse } from "../utils";
import logger from "../utils/logger";
import { usersModel } from "../models/users.model";
import { verifyPassword } from "../utils/password";

const { JWT_SECRET, NODE_ENV } = env;

const authController = {
  login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;
      const [user] = await usersModel.getByEmail(email);
      if (!user) {
        return APIResponse(
          response,
          null,
          "Les identifiants saisits sont incorrects",
          400
        );
      }

      const validPassword = await verifyPassword(user.password, password);
      if (!validPassword)
        return APIResponse(
          response,
          null,
          "Les identifiants saisits sont incorrects",
          400
        );

      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production",
      });
      APIResponse(response, null, "Vous êtes bien connecté", 200);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la connexion de l'utilisateur: ${err.message}`
      );
      APIResponse(response, null, "Erreur serveur", 500);
    }
  },
  logout: async (request: Request, response: Response) => {
    response.clearCookie("accessToken");
    APIResponse(response, null, "Vous êtes déconnecté", 200);
  },
};

export default authController;
