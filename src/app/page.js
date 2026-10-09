import React from 'react';
import MarqueePage from './component/Marquee';
import HeroSectionPage from './component/HeroSection';
import IncreasedProPage from './IncreasedPro/page';
import DecreasedProPage from './DecreasedPro/page';
import AllProductPage from './AllProduct/page';

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