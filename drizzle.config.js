import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export const isProduction = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod";
export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DB_URL,
        ssl: isProduction,
    },
});
//# sourceMappingURL=drizzle.config.js.map