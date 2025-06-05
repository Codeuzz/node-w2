import dotenv from "dotenv";
import { EnvConfig } from "../types/env-types";
dotenv.config();

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT!),
  NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
  ORIGIN: process.env.ORIGIN!,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
