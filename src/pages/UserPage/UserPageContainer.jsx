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
import { CustomTabs, ProfileDetailView } from 'components';

//views import
import UserPageNotFoundView from './UserPageNotFoundView';
import UserPagePostsView from './UserPagePostsView';
import UserPageNoPostsView from './UserPageNoPostsView';
import ClickImageToView from './ClickImageToView';
import FixedFotterView from './FixedFotterView';
import { MainPostCollection, MainPostPhotoOf } from 'pages';
import { UserContext } from 'context/UserContext';
import { SpacedBox } from 'components/General/SpacedBox';
import LoginToLoadMore from './LoginToLoadMore';

export function UserPageContainer() {
   let { username } = useParams();

   const { data: userData, status: userStatus } = useGetUser(username);
   const [enablePost, setEnablePost] = React.useState(false);

   const { user } = React.useContext(UserContext);

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

   useEffect(() => {
      if (
         postStatus === 'success' &&
         postData?.pages?.length > 1 &&
         !user.isAuthenticated
      ) {
         setEnablePost(false);
      } else {
         setEnablePost(Boolean(userData?.username === username));
      }
   }, [
      postStatus,
      postData?.pages?.length,
      user.isAuthenticated,
      userData?.username,
      username,
   ]);

   var tabData = {
      baseRoute: `/${username}`,
      data: [
         {
            label: 'Posts',
            route: '',
            component: (
               <div>
                  {postStatus === 'loading' ? (
                     <LinearProgress />
                  ) : postStatus === 'error' ? (
                     <div>Error Occured: {postError}</div>
                  ) : postStatus === 'success' ? (
                     <div>
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
               </div>
            ),
         },
         {
            label: 'Collection',
            route: 'collection',
            component: userStatus === 'success' && (
               <MainPostCollection
                  username={userData?.username}
                  profile={false}
               />
            ),
         },
         {
            label: 'Mentions',
            route: 'mentions',
            component: userStatus === 'success' && (
               <MainPostPhotoOf username={userData?.username} />
            ),
         },
      ],
   };

   return (
      <div>
         <Container maxWidth="lg" className="margin-top-80">
            {userStatus === 'success' && (
               <ProfileDetailView userData={userData} />
            )}
            {userStatus === 'error' && <UserPageNotFoundView />}
            {userStatus === 'loading' && <LinearProgress />}
            <ClickImageToView />
            {/* TABS STARTS */}
            <CustomTabs data={tabData} />
            {/* TABS ENDS */}
            <SpacedBox />
            {!enablePost && userStatus === 'success' && (
               <LoginToLoadMore username={userData.username} />
            )}
         </Container>
         <FixedFotterView />
      </div>
   );
}
