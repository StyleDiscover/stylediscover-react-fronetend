import React from 'react';

//MUI Imports
import { CardMedia, makeStyles } from '@material-ui/core';

//MUI make style
const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export function MainPostMediaImage({ history, mainPostData, encryptedId }) {
   //use styles
   const classes = useStyles();
   return (
      <CardMedia
         className={classes.imgStyle}
         image={mainPostData.media_url}
         classes={{
            root: classes.mainPostRoot,
         }}
         onClick={() => {
            history.push(`/post/${encryptedId}`);
         }}
      ></CardMedia>
   );
}
