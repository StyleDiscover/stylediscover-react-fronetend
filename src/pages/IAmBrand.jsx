import React from 'react';
import { Link } from 'react-router-dom';

//brand page components
import Hero from '../components/Static/HeroBrand';
import ImageWithFrame from '../components/Static/ImageWithFrame';

//assets
import SectionOneImage from '../assets/BrandSectionOne.png';
import SectionOneBackground from '../assets/SectionBackground.png';
import SectionOneBackgroundFlipped from '../assets/SectionBackgroundFlipped.png';
import FormBackground from '../assets/FormBackground.png';
import HeroBackground from '../assets/HeroBackground.png';

//slider image

//MUI Imports
import {
   Grid,
   makeStyles,
   Typography,
   Button,
   Link as MUILink,
} from '@material-ui/core';
import ContentInMiddle from '../components/Static/ContentInMiddle';

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
export default function IAmBrand() {
   //use styles
   const classes = useStyles();
   return (
      <div>
         <Hero />
         <div>
            <ImageWithFrame
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
         <div>
            <ContentInMiddle background={FormBackground}>
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
