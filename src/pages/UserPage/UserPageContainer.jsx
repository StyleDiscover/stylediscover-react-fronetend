//react imports
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

//hooks
import { useGetUser, useGetPosts } from 'hooks';

//event
import { sendPageViewAnalytics } from 'events/AnalyticsEvents'; //analytics events

//MUI Imports
import { Container, LinearProgress } from '@material-ui/core';

//components
import { ProfileDetailView } from 'components';

//views import
import UserPageNotFoundView from './UserPageNotFoundView';
import UserPagePostsView from './UserPagePostsView';
import UserPageNoPostsView from './UserPageNoPostsView';
import ClickImageToView from './ClickImageToView';
import FixedFotterView from './FixedFotterView';

export function UserPageContainer() {
   let { username } = useParams();

   const { data: userData, status: userStatus } = useGetUser(username);

   const enablePost = userData?.username === username;
   const userId = userData?.id;

   const {
      data: postData,
      error: postError,
      fetchNextPage: fetchNextPost,
      hasNextPage: hasNextPost,
      isFetchingNextPage: fetchingMorePost,
      status: postStatus,
   } = useGetPosts(username, enablePost, userId);

   useEffect(() => {
      if (userData?.id) {
         sendPageViewAnalytics(userData?.id);
      }
   }, [userData?.id]);

   return (
      <div>
         <Container maxWidth="lg" className="margin-top-80">
            {userStatus === 'success' && (
               <ProfileDetailView userData={userData} />
            )}
            {userStatus === 'error' && <UserPageNotFoundView />}
            {userStatus === 'loading' && <LinearProgress />}
            {postStatus === 'loading' ? (
               <LinearProgress />
            ) : postStatus === 'error' ? (
               <div>Error Occured: {postError}</div>
            ) : postStatus === 'success' ? (
               <div>
                  <ClickImageToView />
                  <UserPagePostsView
                     postData={postData.pages}
                     fetchingMorePost={fetchingMorePost}
                     fetchNextPost={fetchNextPost}
                     hasNextPost={hasNextPost}
                  />
               </div>
            ) : (
               postStatus === 'idle' &&
               userStatus !== 'error' &&
               userStatus !== 'loading' && <UserPageNoPostsView />
            )}
            {postStatus === 'success' &&
               postData?.pages[0]?.results.length === 0 && (
                  <UserPageNoPostsView />
               )}
         </Container>
         <FixedFotterView />
      </div>
   );
}
