import { relations } from "drizzle-orm";
import { users } from "./users.schema";
import { books } from "./books.schema";

export const userRelations = relations(users, ({ many }) => ({
  books: many(books),
}));

export const bookRelations = relations(books, ({ one, many }) => ({
  user: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),
}));
