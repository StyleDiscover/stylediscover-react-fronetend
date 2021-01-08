import React from 'react';
import { Link } from 'react-router-dom';

//MUI Imports
import {
   Container,
   Grid,
   Paper,
   Typography,
   Button,
   makeStyles,
   CardMedia,
   Hidden,
} from '@material-ui/core';

//MUI icons
import { WhatsApp } from '@material-ui/icons';

//use styles
const useStyles = makeStyles({
   autoCenter: {
      margin: 'auto',
   },
   sideImage: {
      width: '70%',
      borderRadius: 50,
      border: '10px solid #4f5964',
      margin: 'auto',
      display: 'block',
      outlineOffset: '-20px',
      borderTop: '50px solid #4f5964',
      borderBottom: '55px solid #4f5964',
   },
   content: {
      margin: '10px 0px',
      color: '#444444',
      textAlign: 'justify',
   },
   subtitle: {
      margin: '10px 0px',
      color: '#444444',
      textAlign: 'justify',
   },
   customHeroButton: {
      margin: '10px 0px',
      padding: '10px 15px',
      borderRadius: 10,
      minWidth: 150,
   },
   customContaienr: {
      padding: '75px 0px',
   },
   customHeroButtonWa: {
      margin: '20px 0px',
      padding: '10px 15px',
      borderRadius: 10,
      backgroundColor: '#075E54',
      color: 'white',
      '&:hover': {
         backgroundColor: '#128C7E',
      },
   },
});

export default function ImageWithFrame(props) {
   //use styles
   const classes = useStyles();

   //get content from props
   const {
      imageLeft,
      title,
      subtitle,
      content,
      ctaText,
      imgUrl,
      cta,
      background,
   } = props;

   const contentMarkup = (
      <div style={{ maxWidth: 750, margin: 'auto' }}>
         <Typography variant="h3">{title}</Typography>
         <Typography variant="h6" className={classes.subtitle}>
            {subtitle}
         </Typography>
         <Typography variant="body1" className={classes.content}>
            {content}
         </Typography>
         {cta && (
            <Button
               className={classes.customHeroButtonWa}
               variant="contained"
               onClick={() => {
                  window.open('https://wa.me/17345459845', '_blank');
               }}
               color="secondary"
               disableElevation
               startIcon={<WhatsApp />}
            >
               I Want to Learn More
            </Button>
         )}
      </div>
   );

   const imageMarkup = <img src={imgUrl} className={classes.sideImage}></img>;

   return (
      <Container
         maxWidth="xl"
         className={classes.customContaienr}
         style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: 'cover',
         }}
      >
         <Container maxWidth="lg">
            <Grid container spacing={3}>
               <Grid
                  item
                  xs={12}
                  sm={imageLeft ? 4 : 8}
                  className={classes.autoCenter}
               >
                  {imageLeft ? (
                     imageMarkup
                  ) : (
                     <>
                        <Hidden only={['xs']}>{contentMarkup}</Hidden>
                        <Hidden smUp>{imageMarkup}</Hidden>
                     </>
                  )}
               </Grid>
               <Grid
                  item
                  xs={12}
                  sm={imageLeft ? 8 : 4}
                  className={classes.autoCenter}
               >
                  {imageLeft ? (
                     contentMarkup
                  ) : (
                     <>
                        <Hidden only={['xs']}>{imageMarkup}</Hidden>
                        <Hidden smUp>{contentMarkup}</Hidden>
                     </>
                  )}
               </Grid>
            </Grid>
         </Container>
      </Container>
   );
}
