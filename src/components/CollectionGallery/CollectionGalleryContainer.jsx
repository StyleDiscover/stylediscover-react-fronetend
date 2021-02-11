import { POST_ENCRYPTION_KEY } from 'config/Constants';
import { AES } from 'crypto-js';
import { useGetPostId } from 'hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import CollectionGalleryView from './CollectionGalleryView';

export function CollectionGalleryContainer({ id }) {
   const { data: postData, status: postStatus } = useGetPostId(id);
   const history = useHistory();

   //encrypted ID
   const encryptedId = AES.encrypt(`${id}`, POST_ENCRYPTION_KEY)
      .toString()
      .replace(/\//g, '*');

   return (
      <div>
         {postStatus === 'success' && (
            <CollectionGalleryView
               data={postData}
               history={history}
               encryptedId={encryptedId}
            />
         )}
      </div>
   );
}
