import React from 'react';

//MUI Imports
import { Typography, makeStyles, Container } from '@material-ui/core';

//hero
import LazyHero from 'react-lazy-hero';

//components
import VideoWithContent from './VideoWithContent';

//video import
import HeroVideo from '../../assets/hero.mp4';
import HeroImage from '../../assets/hero.png';
import HeroBackground from '../../assets/HeroBackground.png';
import ImageWithContent from './ImageWithContent';

//usestyles
const useStyles = makeStyles({
   customLogo: {
      fontFamily: 'Megrim',
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
               <Typography variant="h1" className={classes.customLogo}>
                  StyleDiscover
               </Typography>
            }
            subtitle={
               <Typography
                  variant="h4"
                  className={classes.customLogo}
                  style={{ color: '#b66d79' }}
               >
                  <b>Discover | Get Inspired | Shop</b>
               </Typography>
            }
            vidUrl={HeroImage}
         />
      </LazyHero>
   );
}
