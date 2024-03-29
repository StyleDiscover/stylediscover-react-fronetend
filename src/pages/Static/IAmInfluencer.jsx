import React from 'react';
import { Link } from 'react-router-dom';

//brand page components
import Hero from 'components/Static/HeroInfluencer';
import ImageWithFrame from 'components/Static/ImageWithFrame';
import ImageWithFrameStep from 'components/Static/ImageWithFrameStep';
import ImageSlider from 'components/Static/ImageSlider';

//assets
import SectionOneImage from 'assets/InfluencerSectionOne.jpg';
import SectionTwoImage from 'assets/InfluencerSectionTwo.jpg';
import SectionOneBackground from 'assets/SectionBackground.png';
import HeroBackground from 'assets/HeroBackground.png';
import FormBackground from 'assets/FormBackground.png';
import SectionOneBackgroundFlipped from 'assets/SectionBackgroundFlipped.png';

//steps assets
import Step1 from 'assets/steps/step1.jpg';
import Step2 from 'assets/steps/step2.jpg';
import Step3 from 'assets/steps/step3.jpg';
import Step4 from 'assets/steps/step4.jpg';

//slider image
import Slider1 from 'assets/slider/1.jpg';
import Slider2 from 'assets/slider/2.jpg';
import Slider3 from 'assets/slider/3.jpg';

//slider image

//MUI Imports
import {
   Grid,
   makeStyles,
   Typography,
   Button,
   Link as MUILink,
} from '@material-ui/core';
import ContentInMiddle from '../../components/Static/ContentInMiddle';

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
   customButton: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      backgroundColor: '#333333',
      padding: 30,
      borderRadius: 15,
      color: '#eacec5',
   },
});
export function IAmInfluencer() {
   //use styles
   const classes = useStyles();
   return (
      <div>
         <Hero />
         <div>
            <ImageWithFrame
               imageLeft={true}
               title={
                  <Typography variant="h3" className={classes.monFont}>
                     WE'RE NOT JUST ANOTHER INFLUENCER APP.
                  </Typography>
               }
               imgUrl={SectionOneImage}
               content={
                  <Typography variant="body1" className={classes.monFont}>
                     Here, you inspire your audience and we help them shop your
                     styles.
                  </Typography>
               }
               cta={true}
               background={SectionOneBackgroundFlipped}
               // ctaText="Signup"
               // ctaUrl="/login"
            />
         </div>
         <div>
            <ImageWithFrame
               imageLeft={false}
               title={
                  <Typography variant="h3" className={classes.monFont}>
                     INSPIRE YOUR AUDIENCE TO SHOP.
                  </Typography>
               }
               imgUrl={SectionTwoImage}
               content={
                  <Typography variant="body1" className={classes.monFont}>
                     Do what no one else has ever done before. Be the influencer
                     who truly inspires their audience. Do you often get a lot
                     of DMs asking you where to shop for products you showcase?
                     This is the real influence you have. With StyleDiscover,
                     you can up your game and actually help your audience shop.
                  </Typography>
               }
               cta={true}
               background={SectionOneBackground}
               // ctaText="Signup"
               // ctaUrl="/login"
            />
         </div>
         <div>
            <ContentInMiddle background={FormBackground}>
               <Grid container={true} style={{ paddingTop: 40 }}>
                  <Grid item={true} xs={12}>
                     <Typography
                        align="center"
                        variant="h4"
                        className={classes.monFont}
                     >
                        JOIN THE STYLEDISCOVER NETWORK OF TOP INFLUENCERS
                     </Typography>
                  </Grid>
                  <Grid
                     item={true}
                     style={{ margin: 'auto', padding: '50px 0px' }}
                     xs={12}
                     md={4}
                  >
                     <MUILink component={Link} to="/signup">
                        <Typography
                           align="center"
                           variant="h5"
                           className={classes.customButton}
                        >
                           SIGNUP TODAY
                        </Typography>
                     </MUILink>
                  </Grid>
               </Grid>
            </ContentInMiddle>
         </div>

         {/* <div>
            <ImageWithFrameStep
               imageLeft={true}
               title={
                  <Typography variant="h5" className={classes.monFont}>
                     Sign-up <br /> & <br /> Login
                  </Typography>
               }
               stepNumber="01"
               imgUrl={Step1}
               cta={false}
               background={SectionOneBackground}
               mainTitle={
                  <Typography
                     variant="h3"
                     className={classes.monFont}
                     align="center"
                  >
                     <b>HERE'S HOW IT WORKS</b>
                  </Typography>
               }
               // ctaText="Signup"
               // ctaUrl="/login"
            />
            <ImageWithFrameStep
               imageLeft={false}
               title={
                  <Typography variant="h5" className={classes.monFont}>
                     Upload <br /> content with <br /> shoppable <br />{' '}
                     components
                  </Typography>
               }
               stepNumber="02"
               imgUrl={Step2}
               cta={false}
               background={SectionOneBackground}
               // ctaText="Signup"
               // ctaUrl="/login"
            />
            <ImageWithFrameStep
               imageLeft={true}
               title={
                  <Typography variant="h5" className={classes.monFont}>
                     Add <br /> StyleDiscover <br /> link in <br /> Instagram
                     bio
                  </Typography>
               }
               stepNumber="03"
               imgUrl={Step3}
               cta={false}
               background={SectionOneBackground}
               // ctaText="Signup"
               // ctaUrl="/login"
            />
            <ImageWithFrameStep
               imageLeft={false}
               title={
                  <Typography variant="h5" className={classes.monFont}>
                     You're all set <br /> to inspire & <br /> help your <br />{' '}
                     audience <br /> shop
                  </Typography>
               }
               stepNumber="04"
               imgUrl={Step4}
               cta={false}
               background={SectionOneBackground}
               // ctaText="Signup"
               // ctaUrl="/login"
            />
         </div> */}

         <div className={classes.containerMargin}>
            <ImageSlider
               data={[
                  {
                     imageUrls: Slider1,
                     name: 'Sheena Sherwani',
                     sliderUrl: '/sheenasherwani',
                     // content:
                     //    "Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services.",
                  },
                  {
                     imageUrls: Slider2,
                     name: 'Thompson',
                     sliderUrl: '/limitless_adventurer',
                     // content:
                     //    "Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services.",
                  },
                  {
                     imageUrls: Slider3,
                     name: 'Urmi Daga',
                     sliderUrl: '/urmidaga',
                     // content:
                     //    "Testimonials are short quotes from people who love your brand. It's a great way to convince customers to try your services.",
                  },
               ]}
               title={
                  <>
                     <Typography
                        variant="h3"
                        className={classes.monFont}
                        align="center"
                     >
                        NEED MORE INSPIRATION?
                     </Typography>
                     <Typography
                        variant="h6"
                        className={classes.monFont}
                        style={{ marginTop: 10 }}
                        align="center"
                     >
                        Check out our top StyleDiscover influencers
                     </Typography>
                  </>
               }
            />
         </div>
         <div>
            <ContentInMiddle background={HeroBackground}>
               <Grid container={true}>
                  <Grid item={true} xs={12}>
                     <Typography
                        align="center"
                        variant="h2"
                        className={classes.monFont}
                     >
                        Can't wait to get started?
                     </Typography>
                  </Grid>
                  <Grid
                     item={true}
                     style={{ margin: 'auto', padding: '50px 0px' }}
                     xs={12}
                     md={4}
                  >
                     <MUILink component={Link} to="/signup">
                        <Typography
                           align="center"
                           variant="h5"
                           className={classes.customButton}
                        >
                           SIGNUP TODAY
                        </Typography>
                     </MUILink>
                  </Grid>
                  <Grid item={true} xs={12}>
                     <Typography
                        align="center"
                        variant="body1"
                        className={classes.monFont}
                     >
                        Have Questions? Reach out to us at
                     </Typography>
                     <Typography
                        align="center"
                        variant="body1"
                        className={classes.monFont}
                     >
                        hello@stylediscover.in
                     </Typography>
                  </Grid>
               </Grid>
            </ContentInMiddle>
         </div>
      </div>
   );
}
