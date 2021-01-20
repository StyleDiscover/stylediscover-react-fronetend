//react imports
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

//MUI Imports
import { Container } from '@material-ui/core';

//context and events
import { MainPostContext } from 'context/MainPostContext';
import { sendPageViewAnalytics } from 'events/AnalyticsEvents'; //analytics events
import { getMainPost } from 'events/MainPostEvents';

//components
import { ProfileDetailView, LoadingBar } from 'components';

//views import
import UserPageNotFoundView from './UserPageNotFoundView';
import UserPagePostsView from './UserPagePostsView';
import UserPageNoPostsView from './UserPageNoPostsView';

export function UserPageContainer() {
   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //get the username
   let { username } = useParams();

   //states
   const [userData, setUserData] = useState();
   const [loading, setLoading] = useState(false);

   //useeffect
   useEffect(() => {
      setLoading(true);
      getMainPost(username, mainPostDispatch).then((data) => {
         setUserData(data);
         setLoading(false);
         if (data.id) {
            sendPageViewAnalytics(data.id);
         }
      });
   }, []);

   return (
      <Container maxWidth="lg" className="margin-top-80">
         {userData && userData.detail && <UserPageNotFoundView />}

         {userData && userData.username && (
            <div>
               <ProfileDetailView userData={userData} displayName={false} />
               <br />
               <UserPagePostsView userData={userData} />
               {userData.main_posts.length === 0 && <UserPageNoPostsView />}
            </div>
         )}

         {loading && <LoadingBar />}
      </Container>
   );
}
