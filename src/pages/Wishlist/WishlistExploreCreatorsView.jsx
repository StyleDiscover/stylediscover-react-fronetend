import React from 'react';

//slider image
import sheenaImg from 'assets/slider/1.png';
import limitlessImg from 'assets/slider/2.png';
import urmiImg from 'assets/slider/3.png';
import chairImg from 'assets/slider/4.png';
import discoverherstyleImg from 'assets/slider/5.jpeg';

//MUI imports
import { Typography } from '@material-ui/core';

import ImageSlider from 'components/Static/ImageSlider';

export default function WishlistExploreCreatorsView() {
   return (
      <div>
         <ImageSlider
            data={[
               {
                  imageUrls: sheenaImg,
                  name: '@sheenasherwani',
                  sliderUrl: '/sheenasherwani',
               },
               {
                  imageUrls: chairImg,
                  name: '@thestylechair',
                  sliderUrl: '/thestylechair',
               },
               {
                  imageUrls: limitlessImg,
                  name: '@limitless_adventurer',
                  sliderUrl: '/limitless_adventurer',
               },
               {
                  imageUrls: urmiImg,
                  name: '@urmidaga',
                  sliderUrl: '/urmidaga',
               },
               {
                  imageUrls: discoverherstyleImg,
                  name: '@discoverherstyle',
                  sliderUrl: '/discoverherstyle',
               },
            ]}
            title={
               <>
                  <Typography variant="h4">
                     LOOKING FOR MORE COOL STUFF?
                  </Typography>
                  <Typography variant="h6" style={{ marginTop: 10 }}>
                     Check out the latest styles by our top influencers
                  </Typography>
               </>
            }
            exploreMore={true}
         />
      </div>
   );
}
