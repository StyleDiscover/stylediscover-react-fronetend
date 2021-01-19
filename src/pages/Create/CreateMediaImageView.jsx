import React from 'react';

//MUI imports
import { CardMedia, makeStyles } from '@material-ui/core';

//use styles
const useStyle = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      width: '100%',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function CreateMediaImageView({ mediaPreview }) {
   //use styles
   const classes = useStyle();
   return (
      <CardMedia
         className={classes.imgStyle}
         image={mediaPreview}
         classes={{
            root: classes.mainPostRoot,
         }}
      ></CardMedia>
   );
}
