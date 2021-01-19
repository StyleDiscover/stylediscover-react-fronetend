import React from 'react';

//MUI Imports
import { CardMedia } from '@material-ui/core';

export default function CardMediaVideoView({ mediaPreview }) {
   return (
      <CardMedia>
         <video
            // controls
            autoPlay
            loop
            muted
            style={{
               width: '100%',
            }}
         >
            <source src={mediaPreview} title="Video" type="video/mp4"></source>
         </video>
      </CardMedia>
   );
}
