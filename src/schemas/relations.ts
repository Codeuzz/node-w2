import { relations } from "drizzle-orm";
import { users } from "./users.schema";
import { books } from "./books.schema";
import { reviews } from "./reviews.schema";

export const userRelations = relations(users, ({ many }) => ({
  books: many(books),
}));

export const bookRelations = relations(books, ({ one, many }) => ({
  user: one(users, {
    fields: [books.userId],
    references: [users.id],
  }),
  reviews: many(reviews),
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  book: one(books, {
    fields: [reviews.bookId],
    references: [books.id],
  }),
}));
