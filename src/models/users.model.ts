import { db } from "../config/db";
import { NewUser } from "../entities/User";
import { users } from "../schemas/users.schema";
import { eq } from "drizzle-orm";
import logger from "../utils/logger";

export const userModel = {
  getAll: () => {
    try {
      return db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
        })
        .from(users);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des utilisateurs; ${err.message}`
      );
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },
  getByEmail: (email: string) => {
    try {
      return db
        .select({
          id: users.id,
          username: users.username,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getById: (id: string) => {
    try {
      return db
        .select({
          id: users.id,
          username: users.username,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération de l'utilisateur par ID; ${err.message}`
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },

  create: (user: NewUser) => {
    try {
      return db
        .insert(users)
        .values(user)
        .returning({ id: users.id, username: users.username });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la création de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de créer l'utilisateur");
    }
  },
  delete: (id: string) => {
    try {
      return db
        .delete(users)
        .where(eq(users.id, id))
        .returning({ id: users.id, username: users.username });
    } catch (err: any) {
      logger.error(
        `Erreur lors de la suppression de l'utilisateur; ${err.message}`
      );
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  },
};
