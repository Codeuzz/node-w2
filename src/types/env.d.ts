export interface EnvConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  ORIGIN: string;
}
