import { MainPostMediaImage } from 'components/General/MainPostMediaImage';
import { MainPostMediaVideo } from 'components/General/MainPostMediaVideo';
import React from 'react';

export default function CollectionGalleryView({ data, history, encryptedId }) {
   return (
      <div>
         {data.media_type === 'IM' && (
            <MainPostMediaImage
               history={history}
               encryptedId={encryptedId}
               mainPostData={data}
            />
         )}
         {data.media_type === 'VD' && (
            <MainPostMediaVideo
               history={history}
               encryptedId={encryptedId}
               mainPostData={data}
            />
         )}
      </div>
   );
}
