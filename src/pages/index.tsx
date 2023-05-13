import React from "react";

import { CreatorsSection } from "@components/landing/creators-section";
import { FeaturesSection } from "@components/landing/features-section";
import { Hero } from "@components/landing/hero";
import { IntroducationSecion } from "@components/landing/introduction-section";
import { TechnologiesSecion } from "@components/landing/technologies-section";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <IntroducationSecion />
      <FeaturesSection />
      <CreatorsSection />
      <TechnologiesSecion />
    </>
  );
};

export default Home;
