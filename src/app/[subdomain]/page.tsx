import { auth } from "@/auth";
import { db } from "@/db/primary";
import { getTenantDb } from "@/db/tenant";
import React, { type FC } from "react";

interface IIndexPageProps {
  params: { subdomain: string };
}

const AppIndexPage: FC<IIndexPageProps> = async ({ params: { subdomain } }) => {
  const session = await auth();

  return (
    <div>
      <h1>Page {subdomain}</h1>
      <p>Session:</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );

  // const workspace = await db.query.workspaces.findFirst({
  //   where(workspace, { eq }) {
  //     return eq(workspace.subdomain, subdomain);
  //   },
  // });

  // if (!workspace) {
  //   return <div>Workspace not found</div>;
  // }

  // const { tenantDb } = getTenantDb({
  //   dbName: workspace?.database_name,
  //   authToken: workspace?.database_auth_token,
  // });

  // return (
  //   <div>
  //     <h1>Page</h1>
  //     <p>Workspace: {workspace.name}</p>
  //     <p>Subdomain: {workspace.subdomain}</p>
  //     <p>
  //       Session:
  //       <pre>{JSON.stringify(session, null, 2)}</pre>
  //     </p>
  //   </div>
  // );
};

export default AppIndexPage;
