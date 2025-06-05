export interface EnvConfig {
  DATABASE_URL: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: "development" | "production" | "test";
  ORIGIN: string;
}
