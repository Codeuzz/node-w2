import { db } from "../config/db";
import { categories } from "../schemas/categories.schema";
import { eq } from "drizzle-orm";
import logger from "../utils/logger";

export const categoriesModel = {
  getAll: async () => {
    try {
      return await db.select().from(categories);
    } catch (err: any) {
      logger.error("Erreur getAll catégories : " + err.message);
      throw new Error("Impossible de récupérer les catégories");
    }
  },

  getById: async (id: string) => {
    try {
      return await db
        .select()
        .from(categories)
        .where(eq(categories.id, id))
        .limit(1);
    } catch (err: any) {
      logger.error("Erreur getById catégorie : " + err.message);
      throw new Error("Impossible de récupérer la catégorie");
    }
  },

  create: async (name: string) => {
    try {
      return await db.insert(categories).values({ name }).returning();
    } catch (err: any) {
      logger.error("Erreur création catégorie : " + err.message);
      throw new Error("Impossible de créer la catégorie");
    }
  },

  delete: async (id: string) => {
    try {
      return await db
        .delete(categories)
        .where(eq(categories.id, id))
        .returning();
    } catch (err: any) {
      logger.error("Erreur suppression catégorie : " + err.message);
      throw new Error("Impossible de supprimer la catégorie");
    }
  },
};
