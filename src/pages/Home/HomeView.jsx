import React from 'react';
import { Link } from 'react-router-dom';

//home page components
import ImageSlider from 'components/Static/ImageSlider';
import ImageWithContent from 'components/Static/ImageWithContent';

//assets
import SectionOneImage from 'assets/SectionOne.jpg';
import SectionOneBackground from 'assets/SectionBackground.png';
import SectionBackgroundFlipped from 'assets/SectionBackgroundFlipped.png';

//slider image
import sheenaImg from 'assets/slider/1.jpg';
import urmiImg from 'assets/slider/3.jpg';
import chairImg from 'assets/slider/4.png';
import discoverherstyleImg from 'assets/slider/5.jpeg';

//nav imports
import { I_AM_BRAND, I_AM_INFLUENCER, SOW } from 'navigation/Constants';

//MUI Imports
import {
   Grid,
   makeStyles,
   Typography,
   Link as MUILink,
   Container,
   Button,
} from '@material-ui/core';
import { StyleOfTheDay } from 'components/General/StyleOfTheDay';
import { SpacedBox } from 'components/General/SpacedBox';
import LoginToLoadMoreInfluencer from './LoginToLoadMoreInfluencer';

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

export default function HomeView({ isAuth }) {
   //use styles
   const classes = useStyles();

   return (
      <div>
         <div maxWidth="xs" className="margin-top-90">
            <StyleOfTheDay
               //  id="429"
               id="U2FsdGVkX18LQS9q3cRqDmfL*jOonCxVbRgXWLK4I6Q="
               inspireText="celeb styles"
               background={SectionBackgroundFlipped}
            />
         </div>
         <SpacedBox />
         {/* <Hero /> */}
         <div>
            <ImageWithContent
               imageLeft={false}
               title={
                  <Typography variant="h3" className={classes.monFont}>
                     FIND YOUR INSPIRATION
                  </Typography>
               }
               imgUrl={SectionOneImage}
               content={
                  <Typography variant="body1" className={classes.monFont}>
                     Join Stylediscover today to get inspired by seeing millions
                     of styles from other fashionistas and join from over 3000+
                     group for women.
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
         {!isAuth && (
            <Container maxWidth="lg">
               <LoginToLoadMoreInfluencer />
            </Container>
         )}
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
                        <Button variant="outlined" fullWidth={true}>
                           I Am an influencer
                        </Button>
                     </MUILink>
                  </Grid>
                  <Grid item={true} xs={12} md={6} style={{ margin: 'auto' }}>
                     <MUILink component={Link} to={SOW}>
                        <Button variant="outlined" fullWidth={true}>
                           I Am a super organized women
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
