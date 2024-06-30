import React, { FC } from "react";

interface IIndexPageProps {
  params: { subdomain: string };
}

const AppIndexPage: FC<IIndexPageProps> = async ({ params: { subdomain } }) => {
  return (
    <div>
      <h1>Page</h1>
      <p>Subdomain: {subdomain}</p>
    </div>
  );
};

export default AppIndexPage;
