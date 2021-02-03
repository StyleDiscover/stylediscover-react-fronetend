import { CardMedia, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '50%',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function BlogCardMedia({ cover }) {
   const classes = useStyles();
   return (
      <CardMedia
         className={classes.imgStyle}
         image={cover}
         classes={{
            root: classes.mainPostRoot,
         }}
         //    onClick={() => {
         //       history.push(`/post/${encryptedId}`);
         //    }}
      ></CardMedia>
   );
}
