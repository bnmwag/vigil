import { db } from "@/db/primary";
import { getTenantDb } from "@/db/tenant";

export const getWorkspaceDetails = async (subdomain: string) => {
  const workspace = await db.query.workspaces.findFirst({
    where(workspace, { eq }) {
      return eq(workspace.subdomain, subdomain);
    },
  });

  const { tenantDb } = getTenantDb({
    dbName: workspace?.database_name,
    authToken: workspace?.database_auth_token,
  });

  return {
    workspace,
    tenantDb,
  };
};
