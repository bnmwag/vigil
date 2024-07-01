import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({path: ".env",});

const dbCredentials = {
  url: process.env.DATABASE_URL || "",
  authToken: process.env.DATABASE_AUTH_TOKEN,
};

export default {
  schema: "./src/db/primary/schema/index.ts",
  driver: "turso",
  dbCredentials,
  verbose: true,
  dialect: "sqlite",
  strict: true,
  tablesFilter: ["!libsql_wasm_func_table"],
} satisfies Config;
