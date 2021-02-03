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
         <CardMedia
            image={mainPostData.media_url}
            component="video"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            style={{
               width: '100%',
               cursor: 'pointer',
            }}
            onClick={() => {
               history.push(`/post/${encryptedId}`);
            }}
         ></CardMedia>
         {/* <video
            // controls
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            controlsList="nodownload"
            
         >
            <source
               src={}
               title="Video"
               type="video/mp4"
            ></source>
         </video> */}
      </CardMedia>
   );
}
