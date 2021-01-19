//react imports
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

//MUI imports
import { Card } from '@material-ui/core';

//crypto imports
import AES from 'crypto-js/aes';

//context and events imports
import { MainPostContext } from 'context/MainPostContext';
import { getMainPostById } from 'events/MainPostEvents';
import NonEditableMainPostHeaderView from './NonEditableMainPostHeaderView';
import NonEditableMainPostMediaView from './NonEditableMainPostMediaView';
import NonEditableMainPostContentView from './NonEditableMainPostContentView';

//components imports
import { MainPostCaption } from 'components';

export function NonEditableMainPostContainer({ id }) {
   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //states
   const [mainPostData, setMainPostData] = useState();

   //use history
   const history = useHistory();

   const encryptedId = AES.encrypt(`${id}`, 'Pjmaq7EV2C7lQeaUuLVD')
      .toString()
      .replace(/\//g, '*');

   //use effect
   useEffect(() => {
      getMainPostById(id, mainPostDispatch).then((data) =>
         setMainPostData(data)
      );
   }, []);

   return (
      <div>
         {mainPostData && (
            <Card>
               <NonEditableMainPostHeaderView mainPostData={mainPostData} />
               <NonEditableMainPostMediaView
                  history={history}
                  mainPostData={mainPostData}
                  encryptedId={encryptedId}
               />

               {mainPostData.caption !== '' && (
                  <MainPostCaption caption={mainPostData.caption} />
               )}
               <NonEditableMainPostContentView mainPostData={mainPostData} />
            </Card>
         )}
      </div>
   );
}
