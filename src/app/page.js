import React from 'react';
import MarqueePage from './component/Marquee';
import HeroSectionPage from './component/HeroSection';
import IncreasedProPage from './component/IncreasedPro';
import DecreasedProPage from './component/DecreasedPro';
import AllProductPage from './component/AllProduct';

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