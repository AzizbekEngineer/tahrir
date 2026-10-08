import React from "react";
import Hero from "../../components/hero/Hero";
import LiveDemo from "../../components/demo/LiveDemo";
import Works from "../../components/works/Works";
import Audience from "../../components/audience/Audience";
import Stats from "../../components/stats/Stats";
import Pricing from "../../pages/pricing/Pricing";
import CtaBanner from "../../components/banner/Banner";
import Faq from "../../components/faq/Faq";

const Home = () => {
  return (
    <>
      <Hero />
      <LiveDemo />
      <Works />
      <Audience />
      <Stats />
      <Pricing />
      <Faq />
      <CtaBanner />
    </>
  );
};

export default Home;
