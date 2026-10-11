import React from 'react';
import MarqueePage from './component/Marquee';
import HeroSectionPage from './component/HeroSection';
import IncreasedProPage from './AllProduct/Incre';
import DecreasedProPage from './AllProduct/DecrePro';
import AllProductPage from './AllProduct/Allpro';

const page = () => {
  return (
    <div>
      <>
      <MarqueePage></MarqueePage>
      <HeroSectionPage></HeroSectionPage>
      <IncreasedProPage></IncreasedProPage>
      <DecreasedProPage></DecreasedProPage>
      <AllProductPage></AllProductPage>
      </>
    </div>
  );
};

export default page;