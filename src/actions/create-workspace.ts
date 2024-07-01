"use server";

import { db } from "@/db/primary";
import { workspaces } from "@/db/primary/schema";
import { pushToTenantDb } from "@/db/tenant";
import { currentUser } from "@/lib/auth";
import { turso } from "@/lib/turso";
import { createDatabaseId, redirectToSubdomain } from "@/lib/utils";
import type { CreateWorkspaceSchema } from "@/schemas";
import type { z } from "zod";

export const createWorkspace = async (values: z.infer<typeof CreateWorkspaceSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "You must be logged in to create a workspace" };
  }

  const { name, subdomain } = values;

  if (!name || !subdomain) {
    return { error: "Name and subdomain are required" };
  }

  const dbName = `org-${createDatabaseId()}`;

  const {
    database: { Name },
  } = await turso.databases.create({
    name: dbName,
    group: "tenants",
  });

  const { jwt } = await turso.logicalDatabases.mintAuthToken("bnmwag", dbName);

  await pushToTenantDb({
    dbName,
    authToken: jwt,
  });

  const [result] = await db
    .insert(workspaces)
    .values({
      database_auth_token: jwt,
      database_name: dbName,
      name,
      subdomain,
      owner_id: user.id,
    })
    .returning({ id: workspaces.id, subdomain: workspaces.subdomain });

  if (!result) {
    return { error: "Failed to create workspace" };
  }

  redirectToSubdomain(result.subdomain);

  return { success: "Workspace created successfully" };
};
