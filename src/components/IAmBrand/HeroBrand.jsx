import React from 'react';

//MUI Imports
import { Typography, makeStyles, Container } from '@material-ui/core';

//hero
import LazyHero from 'react-lazy-hero';

//components
import VideoWithContent from '../Home/VideoWithContent';

//video import
import HeroVideo from '../../assets/hero.mp4';
import HeroImage from '../../assets/hero.png';
import HeroBackground from '../../assets/HeroBackground.png';

//usestyles
const useStyles = makeStyles({
   customLogo: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
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
         parallaxOffset="100"
      >
         <VideoWithContent
            imageLeft={true}
            title={
               <Typography variant="h2" className={classes.customLogo}>
                  I AM A BRAND.
               </Typography>
            }
            vidUrl={HeroImage}
         />
      </LazyHero>
   );
}
