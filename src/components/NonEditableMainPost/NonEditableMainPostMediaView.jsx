import React from 'react';

//component imports
import { MainPostMediaImage, MainPostMediaVideo } from 'components';

//MUI imports
import { Grid } from '@material-ui/core';

export default function NonEditableMainPostMediaView({
   history,
   encryptedId,
   mainPostData,
}) {
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
