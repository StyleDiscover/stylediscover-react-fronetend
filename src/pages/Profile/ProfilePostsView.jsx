import React from 'react';

import NoPostPRView from './NoPostPRView';
import NoPostNoEmailView from './NoPostNoEmailView';
import NoPostEmailView from './NoPostEmailView';
import ProfilePosts from './ProfilePosts';
import { LinearProgress, Typography } from '@material-ui/core';

export default function ProfilePostsView({
   postData,
   postStatus,
   user,
   fetchNextPost,
   hasNextPost,
   fetchingMorePost,
   handleSentInstaEmail,
   userStatus,
}) {
   return (
      <div>
         {/* NO POST STARTS */}
         {postData?.pages[0]?.results.length === 0 &&
            user.userData.account_type === 'PR' && <NoPostPRView />}
         {postData?.pages[0]?.results.length === 0 &&
            !user.userData.sent_insta_email &&
            user.userData.account_type !== 'PR' && (
               <NoPostNoEmailView
                  accountType={user.userData.account_type}
                  handleSentInstaEmail={handleSentInstaEmail}
               />
            )}
         {postData?.pages[0]?.results.length === 0 &&
            user.userData.sent_insta_email &&
            user.userData.account_type !== 'PR' && <NoPostEmailView />}
         {/* NO POST ENDS */}

         {/* POST STARTS */}
         {postStatus === 'loading' ? (
            <LinearProgress />
         ) : postStatus === 'error' ? (
            <div>Error Occured</div>
         ) : postStatus === 'success' ? (
            <ProfilePosts
               fetchNextPost={fetchNextPost}
               hasNextPost={hasNextPost}
               fetchingMorePost={fetchingMorePost}
               postData={postData}
            />
         ) : (
            postStatus === 'idle' &&
            userStatus !== 'error' &&
            userStatus !== 'loading' && <Typography>No Post</Typography>
         )}

         {/* POST ENDS */}
      </div>
   );
}
