import React from 'react';

//MUI imports
import { CardMedia, makeStyles, Grid, Typography } from '@material-ui/core';

//MUI make style
const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function PostPageMediaView({ mainPostData }) {
   //use styles
   const classes = useStyles();
   return (
      <Grid item xs={12} md={6}>
         {mainPostData.media_type === 'IM' && (
            <div>
               <CardMedia
                  className={classes.imgStyle}
                  image={mainPostData.media_url}
                  classes={{
                     root: classes.mainPostRoot,
                  }}
               ></CardMedia>
               <Typography
                  variant="body2"
                  color="primary"
                  style={{ fontSize: '0.6em', marginRight: 5 }}
                  align="right"
               >
                  {mainPostData.source}
               </Typography>
            </div>
         )}
         {mainPostData.media_type === 'VD' && (
            <div>
               <CardMedia>
                  <video
                     controls
                     controlsList="nodownload"
                     autoPlay={true}
                     loop={true}
                     muted={true}
                     playsInline={true}
                     style={{
                        width: '100%',
                        // maxHeight: '100vh',
                     }}
                  >
                     <source
                        src={mainPostData.media_url}
                        title="Video"
                        type="video/mp4"
                     ></source>
                  </video>
               </CardMedia>
               <Typography
                  variant="body2"
                  color="primary"
                  style={{ fontSize: '0.6em', marginRight: 5 }}
                  align="right"
               >
                  {mainPostData.source}
               </Typography>
            </div>
         )}
      </Grid>
   );
}
