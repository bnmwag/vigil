import { unlinkSync, writeFileSync } from "node:fs";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { spawn } from "node:child_process";

interface TenantDbFuncArgs {
  dbName: string;
  authToken: string;
}

export function getTenantDb({ dbName, authToken }: TenantDbFuncArgs) {
  const tenantClient = createClient({
    url: `libsql://${dbName}-bnmwag.turso.io`,
    authToken,
  });

  const tenantDb = drizzle(tenantClient, { schema, logger: true });

  return { tenantClient, tenantDb };
}

export async function pushToTenantDb({
  dbName,
  authToken,
  input,
}: {
  dbName: string;
  authToken: string;
  input?: boolean;
}) {
  const tmpConfigPath = "./src/db/tenant/drizzle.config.ts";

  const configText = `
  export default {
    schema: "./src/db/tenant/schema/index.ts",
    driver: "turso",
    dbCredentials: {
      url: "libsql://${dbName}-bnmwag.turso.io",
      authToken: "${authToken}",
    },
    tablesFilter: ["!libsql_wasm_func_table"],
  };`;

  writeFileSync(tmpConfigPath, configText);

  return new Promise<void>((resolve, reject) => {
    const proc = spawn("pnpx", ["drizzle-kit", "push:sqlite", `--config=${tmpConfigPath}`], {
      stdio: input ? "inherit" : "ignore",
    });

    proc.on("close", (exitCode) => {
      unlinkSync(tmpConfigPath);

      if (exitCode === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${exitCode}`));
      }
    });

    proc.on("error", (error) => {
      unlinkSync(tmpConfigPath);
      reject(error);
    });
  });
}
