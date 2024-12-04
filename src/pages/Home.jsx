import React, { Suspense } from "react";
import SlideSection from "../components/UI/SlideSection";
const Cards = React.lazy(() => import("../components/UI/Cards"));
const Footer = React.lazy(() => import("../components/UI/Footer"));

const Home = () => {
  return (
    <>
      <SlideSection />
      <Suspense fallback={<div>Loading...</div>}>
        <Cards />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </>
  );
};

export default React.memo(Home);
