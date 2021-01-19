import React from 'react';

//MUI imports
import { CardMedia, makeStyles } from '@material-ui/core';

//compoennts import
import { MainPostMediaImage, MainPostMediaVideo } from 'components';

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
   custonFavButton: {
      margin: 0,
      top: 'auto',
      bottom: 55,
      right: 0,
      left: 10,
      position: 'relative',
      background: '#eee',
   },
   customSize: {
      height: 40,
      width: 40,
   },
   custionButtonRoot: {
      minHeight: 0,
   },
   customChangeInput: {
      display: 'None',
   },
   customChangeButton: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      width: '100%',
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function MediaView({ mainPostData, encryptedId, history }) {
   const classes = useStyles();
   return (
      <div>
         {mainPostData.media_type === 'IM' && (
            <MainPostMediaImage
               history={history}
               encryptedId={encryptedId}
               mainPostData={mainPostData}
            />
         )}
         {mainPostData.media_type === 'VD' && (
            <MainPostMediaVideo
               history={history}
               encryptedId={encryptedId}
               mainPostData={mainPostData}
            />
         )}
      </div>
   );
}
