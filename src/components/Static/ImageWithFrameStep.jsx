import React from 'react';
import { useHistory } from 'react-router-dom';

//nav imports
import { SIGNUP } from 'navigation/Constants';

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
      margin: window.innerWidth < 760 ? 'auto' : '0px',
      display: 'block',
      outlineOffset: '-20px',
      borderTop: '50px solid #4f5964',
      borderBottom: '55px solid #4f5964',
   },
   topTitle: {
      width: '70%',
      margin: window.innerWidth < 760 ? 'auto' : '0px',
      display: 'block',
   },
   content: {
      margin: '0px',
      textAlign: 'justify',
   },
   subtitle: {
      margin: '10px 0px',
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

export default function ImageWithFrameStep(props) {
   //use styles
   const classes = useStyles();

   //history
   const history = useHistory();

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
      mainTitle,
      stepNumber,
   } = props;

   const contentMarkup = (
      <div style={{ maxWidth: 750, margin: 'auto' }}>
         <div
            style={
               window.innerWidth > 760
                  ? {
                       backgroundColor: '#b66d79',
                       padding: 20,
                       maxWidth: 250,
                       float: imageLeft ? 'left' : 'right',
                       width: '100%',
                       // margin: 'auto',
                       marginTop: 10,
                       color: '#eee',
                       textAlign: imageLeft ? 'center' : 'center',
                    }
                  : {
                       backgroundColor: '#b66d79',
                       padding: 20,
                       maxWidth: 250,
                       // float: imageLeft ? 'left' : 'right',
                       width: '100%',
                       margin: 'auto',
                       marginTop: 10,
                       color: '#eee',
                       textAlign: imageLeft ? 'center' : 'center',
                    }
            }
         >
            <Typography variant="h3">{title}</Typography>
            <Typography variant="h6" className={classes.subtitle}>
               {subtitle}
            </Typography>
            <Typography variant="body1" className={classes.content}>
               {content}
            </Typography>
         </div>
         {cta && (
            // <Button
            //    className={classes.customHeroButtonWa}
            //    variant="contained"
            //    onClick={() => {
            //       window.open('https://wa.me/17345459845', '_blank');
            //    }}
            //    color="secondary"
            //    disableElevation
            //    startIcon={<WhatsApp />}
            // >
            //    I Want to Learn More
            // </Button>
            <Button
               className={classes.customHeroButton}
               variant="contained"
               onClick={() => {
                  history.push(SIGNUP);
               }}
               color="primary"
               disableElevation
            >
               Sign-up Now
            </Button>
         )}
      </div>
   );

   const imageMarkup = (
      <Grid container={true}>
         <Grid item={true} xs={12}>
            <Typography
               align="center"
               style={
                  window.innerWidth > 760
                     ? {
                          float: imageLeft ? 'right' : 'left',
                       }
                     : {}
               }
               className={classes.topTitle}
               variant="h1"
            >
               <b>{stepNumber && stepNumber}</b>
            </Typography>
         </Grid>
         <Grid item={true} xs={12}>
            <img
               src={imgUrl}
               className={classes.sideImage}
               style={
                  window.innerWidth > 760
                     ? {
                          float: imageLeft ? 'right' : 'left',
                       }
                     : {}
               }
            ></img>
         </Grid>
      </Grid>
   );

   return (
      <Container
         maxWidth="xl"
         className={classes.customContaienr}
         style={{
            background: `url(${background}) no-repeat center center fixed`,
            backgroundSize: 'cover',
         }}
      >
         <Container maxWidth="md">
            {mainTitle && <div style={{ marginBottom: 37.5 }}>{mainTitle}</div>}
            <Grid container spacing={0}>
               <Grid item xs={12} sm={6} className={classes.autoCenter}>
                  {imageLeft ? (
                     imageMarkup
                  ) : (
                     <>
                        <Hidden only={['xs']}>{contentMarkup}</Hidden>
                        <Hidden smUp>{imageMarkup}</Hidden>
                     </>
                  )}
               </Grid>
               <Grid item xs={12} sm={6} className={classes.autoCenter}>
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
