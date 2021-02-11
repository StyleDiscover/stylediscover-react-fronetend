import React from 'react';

//compoennts import
import { MainPostMediaImage, MainPostMediaVideo } from 'components';
import { Typography } from '@material-ui/core';

export default function MediaView({ mainPostData, encryptedId, history }) {
   return (
      <div>
         {mainPostData.media_type === 'IM' && (
            <div>
               <MainPostMediaImage
                  history={history}
                  encryptedId={encryptedId}
                  mainPostData={mainPostData}
               />
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
               <MainPostMediaVideo
                  history={history}
                  encryptedId={encryptedId}
                  mainPostData={mainPostData}
               />
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
      </div>
   );
}
