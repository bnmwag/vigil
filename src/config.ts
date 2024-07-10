import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    DATABASE_CONNECTION_TYPE: z.enum(["local", "remote", "local-replica"]),
    DATABASE_URL: z.string().min(1),
    DATABASE_AUTH_TOKEN: z
      .string()
      .optional()
      .refine((s) => {
        // not needed for local only
        const type = process.env.DATABASE_CONNECTION_TYPE;
        return type === "remote" || type === "local-replica" ? s && s.length > 0 : true;
      }),
    NODE_ENV: z.enum(["development", "production"]),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    HOST_URL: z.string(),
    TURSO_API_KEY: z.string(),
    NEXT_PUBLIC_DOMAIN: z.string(),
    AUTH_SECRET: z.string(),
    AUTH_DRIZZLE_URL: z.string(),
    NEXTAUTH_URL: z.string(),
  },
  runtimeEnv: process.env,
});

const args = {
  // watch: process.argv.includes("--watch"),
  // liveReload: true,
};

export const config = {
  env,
  args,
};
