import React from 'react';
import { Link } from 'react-router-dom';

//home page components
import Hero from 'components/Static/HeroHome';
import ImageSlider from 'components/Static/ImageSlider';
import ImageWithContent from 'components/Static/ImageWithContent';

//assets
import SectionOneImage from 'assets/SectionOne.jpg';
import SectionOneBackground from 'assets/SectionBackground.png';

//slider image
import sheenaImg from 'assets/slider/1.jpg';
import limitlessImg from 'assets/slider/2.jpg';
import urmiImg from 'assets/slider/3.jpg';
import chairImg from 'assets/slider/4.png';
import discoverherstyleImg from 'assets/slider/5.jpeg';

//nav imports
import { I_AM_BRAND, I_AM_INFLUENCER } from 'navigation/Constants';

//MUI Imports
import {
   Grid,
   makeStyles,
   Typography,
   Link as MUILink,
   Container,
   Button,
} from '@material-ui/core';

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

export function Home() {
   //use styles
   const classes = useStyles();

   return (
      <div>
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
                     <Typography
                        variant="h3"
                        className={classes.monFont}
                        align="center"
                     >
                        IF IT'S IN TREND, YOU'LL FIND IT HERE.
                     </Typography>
                     <Typography
                        variant="h6"
                        className={classes.monFont}
                        style={{ marginTop: 10 }}
                        align="center"
                     >
                        Check out the latest styles by our top influencers
                     </Typography>
                  </>
               }
            />
         </div>
         <div className={classes.containerMargin}>
            {' '}
            {/* <ContentInMiddle background={false}> */}
            <Container maxWidth="sm">
               <Grid container={true} spacing={2}>
                  <Grid item={true} xs={12} md={6} style={{ margin: 'auto' }}>
                     <MUILink component={Link} to={I_AM_BRAND}>
                        {/* <Typography
                           variant="h6"
                           style={{
                              padding: '10px 0px',
                              cursor: 'pointer',
                              backgroundColor: '#4f5964',
                              color: '#eacec5',
                              borderRadius: 15,
                           }}
                           align="center"
                        >
                           I am a Brand
                        </Typography> */}
                        <Button variant="outlined" fullWidth={true}>
                           I Am a brand
                        </Button>
                     </MUILink>
                  </Grid>
                  <Grid item={true} xs={12} md={6} style={{ margin: 'auto' }}>
                     <MUILink component={Link} to={I_AM_INFLUENCER}>
                        {/* <Typography
                           variant="h6"
                           style={{
                              padding: '10px 0px',
                              cursor: 'pointer',
                              backgroundColor: '#4f5964',
                              color: '#eacec5',
                              borderRadius: 15,
                           }}
                           align="center"
                        >
                           I am an Influencer
                        </Typography> */}
                        <Button variant="outlined" fullWidth={true}>
                           I Am an influencer
                        </Button>
                     </MUILink>
                  </Grid>
               </Grid>
            </Container>
            {/* </ContentInMiddle> */}
         </div>
      </div>
   );
}
