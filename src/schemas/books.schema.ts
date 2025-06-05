import { pgTable, text, uuid, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { categories } from "./categories.schema";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom().primaryKey(),
  title: text("title").notNull().unique(),
  author: text("author").notNull(),
  publishedYear: integer("published_year").notNull(),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});
