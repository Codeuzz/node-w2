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
        })
        .from(users);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des utilisateurs; ${err.message}`
      );
      throw new Error("Impossible de récupérer les utilisateurs");
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
};
