//react imports
import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI imports
import { Card } from '@material-ui/core';

//crypto imports
import AES from 'crypto-js/aes';

//hooks
import { useGetPostId } from 'hooks';

//context and events imports
import NonEditableMainPostHeaderView from './NonEditableMainPostHeaderView';
import NonEditableMainPostMediaView from './NonEditableMainPostMediaView';
import NonEditableMainPostContentView from './NonEditableMainPostContentView';

//components imports
import { POST_ENCRYPTION_KEY } from 'config/Constants';

export function NonEditableMainPostContainer({ id }) {
   //react-query
   const { data: mainPostData, status: mainPostStatus } = useGetPostId(id);

   //use history
   const history = useHistory();

   const encryptedId = AES.encrypt(`${id}`, POST_ENCRYPTION_KEY)
      .toString()
      .replace(/\//g, '*');

   //use effect
   return (
      <div>
         {mainPostStatus === 'success' && (
            <Card>
               <NonEditableMainPostHeaderView mainPostData={mainPostData} />
               <NonEditableMainPostMediaView
                  history={history}
                  mainPostData={mainPostData}
                  encryptedId={encryptedId}
               />

               {/* {mainPostData.caption !== '' && (
                  <MainPostCaption caption={mainPostData.caption} />
               )} */}
               <NonEditableMainPostContentView mainPostData={mainPostData} />
            </Card>
         )}
      </div>
   );
}
