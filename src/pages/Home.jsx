import React from 'react';
import { Link } from 'react-router-dom';

//home page components
import Hero from '../components/Static/HeroHome';
import ImageSlider from '../components/Static/ImageSlider';
import ImageWithContent from '../components/Static/ImageWithContent';

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
import {
   Grid,
   makeStyles,
   Typography,
   Link as MUILink,
   Container,
} from '@material-ui/core';
import ContentInMiddle from '../components/Static/ContentInMiddle';

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
         <div className={classes.containerMargin}>
            {' '}
            {/* <ContentInMiddle background={false}> */}
            <Container maxWidth="sm">
               <Grid container={true} spacing={3}>
                  <Grid item={true} xs={6} md={6} style={{ margin: 'auto' }}>
                     <MUILink component={Link} to="/sd/iamabrand">
                        <Typography
                           variant="h5"
                           style={{
                              padding: '25px 0px',
                              cursor: 'pointer',
                              backgroundColor: '#4f5964',
                              color: '#eacec5',
                              borderRadius: 15,
                           }}
                           align="center"
                        >
                           I am a Brand
                        </Typography>
                     </MUILink>
                  </Grid>
                  <Grid item={true} xs={6} md={6} style={{ margin: 'auto' }}>
                     <MUILink component={Link} to="/sd/iamaninfluencer">
                        <Typography
                           variant="h5"
                           style={{
                              padding: '25px 0px',
                              cursor: 'pointer',
                              backgroundColor: '#4f5964',
                              color: '#eacec5',
                              borderRadius: 15,
                           }}
                           align="center"
                        >
                           I am an Influencer
                        </Typography>
                     </MUILink>
                  </Grid>
               </Grid>
            </Container>
            {/* </ContentInMiddle> */}
         </div>
      </div>
   );
}
