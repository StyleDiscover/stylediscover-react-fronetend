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

//use styles
const useStyles = makeStyles({
   autoCenter: {
      margin: 'auto',
   },
   sideImage: {
      paddingTop: '100%',
      width: '100%',
   },
   content: {
      margin: '10px 0px',
      color: '#444444',
      textAlign: 'justify',
   },
   subtitle: {
      margin: '10px 0px',
      color: '#444444',
   },
   customHeroButton: {
      margin: '10px 0px',
      padding: '10px 15px',
      borderRadius: 10,
      minWidth: 150,
   },
});

export default function VideoWithContent(props) {
   //use styles
   const classes = useStyles();

   //get content from props
   const {
      imageLeft,
      title,
      subtitle,
      content,
      ctaText,
      vidUrl,
      ctaUrl,
      fullwidth,
   } = props;

   const contentMarkup = (
      <div>
         <Typography variant="h3">{title}</Typography>
         <Typography variant="h6" className={classes.subtitle}>
            {subtitle}
         </Typography>
         <Typography variant="body1" className={classes.content}>
            {content}
         </Typography>
         {ctaText && ctaUrl && (
            <Button
               className={classes.customHeroButton}
               variant="contained"
               component={Link}
               to={ctaUrl}
               color="primary"
               disableElevation
            >
               {ctaText}
            </Button>
         )}
      </div>
   );

   const imageMarkup = (
      <Container maxWidth="lg" style={{ padding: 35 }}>
         {!fullwidth && (
            <Paper elevation="5" style={{ width: '250px', margin: 'auto' }}>
               <CardMedia
                  image={vidUrl}
                  component="image"
                  style={{ paddingTop: '100%', height: 250, width: 250 }}
               ></CardMedia>
            </Paper>
         )}
         {fullwidth && (
            <Paper elevation="5" style={{ width: '300px', margin: 'auto' }}>
               <CardMedia
                  image={vidUrl}
                  component="image"
                  style={{
                     paddingTop: '100%',
                     height: 0,
                     width: 300,
                  }}
               ></CardMedia>
            </Paper>
         )}
      </Container>
   );

   return (
      <div style={{ overflow: 'hidden' }}>
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
      </div>
   );
}
