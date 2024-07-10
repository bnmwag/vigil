import type { NextPage } from "next";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Hero } from "./components/hero";
import { currentUser } from "@/lib/auth";
import { auth } from "@/auth";

const SiteIndexPage: NextPage = async () => {
  const session = await auth();

  return (
    <>
      {JSON.stringify(session, null, 2)}
      <Hero />
      <Features />
      <FAQ />
    </>
  );
};

export default SiteIndexPage;
