import React from 'react';

//brand page components
import Footer from '../components/Home/Footer';
import Hero from '../components/IAmBrand/HeroBrand';
import ImageWithContent from '../components/Home/ImageWithContent';

//assets
import SectionOneImage from '../assets/SectionOne.png';
import SectionOneBackground from '../assets/SectionBackground.png';

//slider image

//MUI Imports
import { makeStyles, Typography } from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   containerMargin: {
      marginTop: 75,
      marginBottom: 75,
      position: 'relative',
   },
   monFont: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
   },
});
export default function IAmBrand() {
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
                     FROM DISCOVERY TO SHOPPING.
                  </Typography>
               }
               imgUrl={SectionOneImage}
               content={
                  <Typography variant="body1" className={classes.monFont}>
                     Do you often struggle in redirecting your audience from
                     Instagram to the right product on your website? Style
                     Discover is a unique platform that allows you to turn every
                     Instagram post into a shoppable experience for your
                     audience.
                  </Typography>
               }
               cta={true}
               background={SectionOneBackground}
               // ctaText="Signup"
               // ctaUrl="/login"
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
