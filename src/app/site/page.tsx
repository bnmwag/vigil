import type { NextPage } from "next";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { currentUser } from "@/lib/auth";

const SiteIndexPage: NextPage = async () => {
  const user = await currentUser();

  return (
    <>
      <Hero />
      <Features />
      <FAQ />
    </>
  );
};

export default SiteIndexPage;
