import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export const isProduction =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: isProduction ? process.env.DB_URL_PROD! : process.env.DB_URL_LOCAL!,
    ssl: isProduction ? { rejectUnauthorized: false } : isProduction,
  },
});
