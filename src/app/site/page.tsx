import type { NextPage } from "next";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";

const SiteIndexPage: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
    </>
  );
};

export default SiteIndexPage;
