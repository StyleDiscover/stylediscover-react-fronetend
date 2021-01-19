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

export function MainPostMediaVideo({ history, mainPostData, encryptedId }) {
   const classes = useStyles();
   return (
      <CardMedia>
         <video
            // controls
            autoPlay
            loop
            muted
            style={{
               width: '100%',
               cursor: 'pointer',
            }}
            onClick={() => {
               history.push(`/post/${encryptedId}`);
            }}
         >
            <source
               src={mainPostData.media_url}
               title="Video"
               type="video/mp4"
            ></source>
         </video>
      </CardMedia>
   );
}
