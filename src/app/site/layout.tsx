import type React from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default SiteLayout;
