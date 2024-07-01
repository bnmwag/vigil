import { pushToTenantDb } from ".";
import { db } from "../primary";

(async () => {
  const workspaces = await db.query.workspaces.findMany();

  for (const workspace of workspaces) {
    await pushToTenantDb({
      dbName: workspace.database_name,
      authToken: workspace.database_auth_token,
      input: true,
    });

    console.log(`Pushed to ${workspace.database_name}`);
  }
})();
