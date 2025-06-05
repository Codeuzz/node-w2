import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { books } from "../schemas";

export type Book = InferSelectModel<typeof books>;

export type NewBook = InferInsertModel<typeof books>;
