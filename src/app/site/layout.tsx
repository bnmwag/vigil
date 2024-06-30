import React from "react";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className='h-full'>{children}</main>;
};

export default SiteLayout;
