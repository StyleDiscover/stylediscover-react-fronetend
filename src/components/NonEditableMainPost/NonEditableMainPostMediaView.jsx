import React from 'react';

//component imports
import { MainPostMediaImage, MainPostMediaVideo } from 'components';

//MUI imports
import { Typography } from '@material-ui/core';

export default function NonEditableMainPostMediaView({
   history,
   encryptedId,
   mainPostData,
}) {
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
