import React from 'react';

//home page components
import Hero from '../components/Home/HeroHome';
import ImageSlider from '../components/Home/ImageSlider';
import ImageWithContent from '../components/Home/ImageWithContent';

//assets
import SectionOneImage from '../assets/SectionOne.png';
import SectionOneBackground from '../assets/SectionBackground.png';

//slider image
import Slider1 from '../assets/slider/1.png';
import Slider2 from '../assets/slider/2.png';
import Slider3 from '../assets/slider/3.png';
import Slider4 from '../assets/slider/4.jpg';
import Slider5 from '../assets/slider/5.jpeg';
import Slider6 from '../assets/slider/6.jpg';

//MUI Imports
import { makeStyles, Typography } from '@material-ui/core';
import Footer from '../components/Home/Footer';

//use styles
const useStyles = makeStyles({
   containerMargin: {
      marginTop: 75,
      marginBottom: 75,
   },
   monFont: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
   },
});

export default function Home() {
   //use styles
   const classes = useStyles();

   return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
         <Hero />
         <div>
            <ImageWithContent
               imageLeft={false}
               title={
                  <Typography variant="h3" className={classes.monFont}>
                     WE ALL NEED A LITTLE HELP.
                  </Typography>
               }
               imgUrl={SectionOneImage}
               content={
                  <Typography variant="body1" className={classes.monFont}>
                     StyleDiscover is here to help you discover the latest
                     trends and the styles from the top influencers in the
                     country. You can find inspiration and shop for styles that
                     you love - all in one place.
                  </Typography>
               }
               cta={true}
               background={SectionOneBackground}
               // ctaText="Signup"
               // ctaUrl="/login"
            />
         </div>
         <div className={classes.containerMargin}>
            <ImageSlider
               data={[
                  {
                     imageUrls: Slider1,
                     name: 'Sheena Sherwani',
                     sliderUrl: '/sheenasherwani',
                  },
                  {
                     imageUrls: Slider2,
                     name: 'Thompson',
                     sliderUrl: '/limitless_adventurer',
                  },
                  {
                     imageUrls: Slider3,
                     name: 'Urmi Daga',
                     sliderUrl: '/urmidaga',
                  },
                  {
                     imageUrls: Slider4,
                     name: 'Devika Vaid',
                     sliderUrl: '/devika_vaid',
                  },
                  {
                     imageUrls: Slider5,
                     name: 'Discoverherstyle',
                     sliderUrl: '/discoverherstyle',
                  },
                  {
                     imageUrls: Slider6,
                     name: 'Littlesassyrealclassy',
                     sliderUrl: '/littlesassyrealclassy',
                  },
               ]}
               title={
                  <>
                     <Typography variant="h3" className={classes.monFont}>
                        IF IT'S IN TREND, YOU'LL FIND IT HERE.
                     </Typography>
                     <Typography
                        variant="h6"
                        className={classes.monFont}
                        style={{ marginTop: 10 }}
                     >
                        Check out the latest styles by our top influencers
                     </Typography>
                  </>
               }
            />
         </div>
         <div
            style={{
               paddingBottom: 125,
            }}
         ></div>
         <Footer />
      </div>
   );
}
