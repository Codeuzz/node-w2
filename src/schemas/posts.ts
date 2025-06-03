import {
  PgTable,
  uuid,
  varchar,
  text,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  author: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").defaultNow(),
});
