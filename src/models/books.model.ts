import { db } from "../config/db";
import { books, users } from "../schemas";
import { eq } from "drizzle-orm";
import logger from "../utils/logger";
import { NewBook } from "../entities/Book";
import { usersModel } from "./users.model";

export const booksModel = {
  getAll: () => {
    try {
      return db
        .select({
          id: books.id,
          title: books.title,
          author: books.author,
          publishedYear: books.publishedYear,
          borrower: {
            id: users.id,
            username: users.username,
          },
        })
        .from(books)
        .leftJoin(users, eq(books.userId, users.id));
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération des utilisateurs; ${err.message}`
      );
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },

  getById: (id: string) => {
    try {
      return db
        .select({
          id: books.id,
          title: books.title,
          author: books.author,
          publishedYear: books.publishedYear,
          borrower: {
            id: users.id,
            username: users.username,
          },
        })
        .from(books)
        .where(eq(books.id, id))
        .leftJoin(users, eq(books.userId, users.id))
        .limit(1);
    } catch (err: any) {
      logger.error(
        `Erreur lors de la récupération du livre par ID; ${err.message}`
      );
      throw new Error("Impossible de récupérer le livre");
    }
  },

  create: (book: NewBook) => {
    try {
      return db
        .insert(books)
        .values(book)
        .returning({ id: books.id, title: books.title });
    } catch (err: any) {
      logger.error(`Erreur lors de la création du livre; ${err.message}`);
      throw new Error("Impossible de créer le livre");
    }
  },
  delete: (id: string) => {
    try {
      return db
        .delete(books)
        .where(eq(books.id, id))
        .returning({ id: books.id, title: books.title });
    } catch (err: any) {
      logger.error(`Erreur lors de la suppression du livre; ${err.message}`);
      throw new Error("Impossible de supprimer le livre");
    }
  },
};
