import React from 'react';

//component imports
import { MainPostMediaImage, MainPostMediaVideo } from 'components';

export default function NonEditableMainPostMediaView({
   history,
   mainPostData,
   encryptedId,
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
