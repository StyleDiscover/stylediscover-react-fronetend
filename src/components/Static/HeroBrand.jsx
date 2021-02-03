import React from 'react';

//MUI Imports
import { Typography, makeStyles, Container } from '@material-ui/core';

//hero
import LazyHero from 'react-lazy-hero';

//components
import VideoWithContent from './VideoWithContent';

//video import
import HeroImage from 'assets/BrandHero.jpg';
import HeroBackground from 'assets/HeroBackground.png';

//usestyles
const useStyles = makeStyles({
   customLogo: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      letterSpacing: 2,
   },
});

export default function Hero() {
   //use styles
   const classes = useStyles();
   return (
      <LazyHero
         imageSrc={HeroBackground}
         minHeight="100vh"
         opacity="0.5"
         parallaxOffset="1"
      >
         <VideoWithContent
            imageLeft={true}
            title={
               <Typography
                  variant="h2"
                  className={classes.customLogo}
                  align="center"
               >
                  <b>I'M A BRAND</b>
               </Typography>
            }
            vidUrl={HeroImage}
            fullwidth={false}
         />
      </LazyHero>
   );
}
