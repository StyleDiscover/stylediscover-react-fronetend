import React from 'react';

//MUI Imports
import { CardMedia, makeStyles } from '@material-ui/core';
import { Videocam } from '@material-ui/icons';

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
   customSize: {
      height: 25,
      width: 25,
   },
   custiomButtonRoot: {
      minHeight: 0,
   },
   customDeleteButton: {
      margin: 0,
      right: 10,
      top: 10,
      position: 'absolute',
      color: '#eee',
   },
   customText: {
      margin: 0,
      left: 10,
      bottom: 10,
      position: 'absolute',
      color: '#eee',
   },
});

export function MainPostMediaVideo({ history, mainPostData, encryptedId }) {
   const classes = useStyles();
   return (
      <div className="outerDiv">
         <CardMedia
            image={mainPostData.media_url + '#t=0.8'}
            component="video"
            autoPlay={false}
            loop={true}
            muted={true}
            playsInline={true}
            className="innerVideo"
            onClick={() => {
               history.push(`/post/${encryptedId}`);
            }}
         ></CardMedia>
         <div
            classes={{
               sizeSmall: classes.customSize,
               root: classes.custiomButtonRoot,
            }}
            size="small"
            aria-label="like"
            className={classes.customDeleteButton}
         >
            <Videocam style={{ width: 25, height: 25 }} />
         </div>
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
      </div>
   );
}
