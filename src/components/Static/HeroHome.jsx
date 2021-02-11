import React from 'react';

//MUI Imports
import { Typography, makeStyles, Container } from '@material-ui/core';

//hero
import LazyHero from 'react-lazy-hero';

//components
import VideoWithContent from './VideoWithContent';

//video import
import HeroImage from '../../assets/hero.jpg';
import HeroBackground from '../../assets/HeroBackground.png';

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
      <Container
         maxWidth="xl"
         className={classes.customContaienr}
         style={{
            background: `url(${HeroBackground}) no-repeat center center fixed`,
            backgroundSize: 'cover',
            // minHeight: '100vh',
         }}
      >
         <Container maxWidth="lg">
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
         </Container>
      </Container>
   );
}
