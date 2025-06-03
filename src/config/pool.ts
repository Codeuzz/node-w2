// Initialiser une connexion à la DB hors instance express
import { Pool } from "pg";
import { env } from "./env";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

import * as schema from "../schemas/index";

const { DATABASE_URL } = env;

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
