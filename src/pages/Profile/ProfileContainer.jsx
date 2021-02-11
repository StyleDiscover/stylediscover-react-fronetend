import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

//lazy loading
import { loadable } from 'react-lazily/loadable';

//navigation constant
import { ANALYTICS } from 'navigation/Constants';

//import context
import { UserContext } from 'context/UserContext';

//import services
import { updateUserInfo, setUserData } from 'events/UserEvents';
import { sendEmailToAdmin } from 'events/MainPostEvents';

//MUI imports
import { Container, LinearProgress, Typography } from '@material-ui/core';

//hooks
import { useGetUser, useGetPosts } from 'hooks';

//view imports
import CopyRedirectView from './CopyRedirectView';
import ButtonGroupView from './ButtonGroupView';
import EditProfileDialogView from './EditProfileDialogView';
import CreateButtonView from './CreateButtonView';
import { CustomTabs } from 'components';
import ProfilePostsView from './ProfilePostsView';
import { MainPostCollection, MainPostPhotoOf } from 'pages';
// import TabsView from './TabsView';

//components, ,
const { ProfileDetailView } = loadable(() => import('components'));

export function ProfileContainer() {
   //use context
   const { user, userDispatch } = useContext(UserContext);
   // const { mainPosts } = useContext(MainPostContext);
   const { data: userData, status: userStatus } = useGetUser(
      user.userData.username
   );

   const enabled = userData?.username === user.userData.username;
   const userId = userData?.id;
   const {
      data: postData,
      fetchNextPage: fetchNextPost,
      hasNextPage: hasNextPost,
      isFetchingNextPage: fetchingMorePost,
      status: postStatus,
   } = useGetPosts(user.userData.username, enabled, userId);

   //history
   const history = useHistory();

   //STATES
   // for email

   //for edit profile dialog
   const [editProfileOpen, setEditProfileOpen] = useState(false);

   //change profile picture
   const updateProfilePicture = async (event) => {
      if (event.target.files && event.target.files[0]) {
         var userInfo = new FormData();
         userInfo.append('profile_picture', event.target.files[0]);
         if (event.target.files[0].size / (1024 * 1024) < 50) {
            await updateUserInfo(
               userInfo,
               user.userData.username,
               userDispatch
            ).then(async (res) => {
               if (res === 200) {
                  await setUserData(user.userData.username, userDispatch);
               } else {
                  window.alert('Please Uplaod An Image');
               }
            });
         } else {
            window.alert('File Size Exceeds 50 MB.');
         }
      }
   };

   //email functions
   const handleSentInstaEmail = async () => {
      const subject = `Import Instagram - ${user.userData.username}`;
      const message = `Import last five instagram posts of ${user.userData.username}.`;

      const emailStatus = await sendEmailToAdmin(
         subject,
         message,
         user.userData.username
      );

      if (emailStatus === 200) {
         await setUserData(user.userData.username, userDispatch);
         window.alert('We have recieved your message!');
      } else {
         window.alert('Error sending message, try again later.');
      }
   };

   //for button group
   const handleProfileButton = () => {
      history.push(ANALYTICS);
   };

   //for edit profile
   const handleEditProfileDialogOpen = () => {
      setEditProfileOpen(true);
   };

   const handleEditProfileDialogClose = () => {
      setEditProfileOpen(false);
   };

   const tabData = {
      baseRoute: '/profile',
      data: [
         {
            label: 'Posts',
            route: '',
            component: (
               <ProfilePostsView
                  postData={postData}
                  postStatus={postStatus}
                  user={user}
                  fetchNextPost={fetchNextPost}
                  hasNextPost={hasNextPost}
                  fetchingMorePost={fetchingMorePost}
                  handleSentInstaEmail={handleSentInstaEmail}
                  userStatus={userStatus}
               />
            ),
         },
         {
            label: 'Collection',
            route: 'collection',
            component: userStatus === 'success' && (
               <MainPostCollection username={userData?.username} />
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

   return Object.keys(user.userData).length !== 0 ? (
      <Container maxWidth="lg" className="margin-top-80">
         {/* PROFILE INFO STARTS */}
         <ProfileDetailView
            userData={user.userData}
            loading={user.loading}
            updateProfilePicture={updateProfilePicture}
         />
         {/* PROFILE INFO ENDS */}

         {/* COPY REDIRECT STARTS */}
         <CopyRedirectView username={user.userData.username} />
         {/* COPY REDIRECT ENDS */}

         {/* BUTTON GROUP STARTS*/}
         <ButtonGroupView
            handleProfileButton={handleProfileButton}
            handleEditProfileDialogOpen={handleEditProfileDialogOpen}
            userData={user.userData}
         />
         {/* BUTTON GROUP ENDS*/}

         {/* CREATE BUTTON STARTS */}
         <CreateButtonView />
         {/* CREATE BUTTON ENDS */}

         {/* TABS STARTS */}
         <CustomTabs data={tabData} />
         {/* TABS ENDS */}

         {/* EDIT PROFILE DIALOG STARTS */}
         <EditProfileDialogView
            editProfileOpen={editProfileOpen}
            handleEditProfileDialogClose={handleEditProfileDialogClose}
            loading={user.loading}
            userData={user.userData}
            updateProfilePicture={updateProfilePicture}
         />
         {/* EDIT PROFILE DIALOG ENDS */}
      </Container>
   ) : (
      <Container maxWidth="md" className="margin-top-80">
         <Typography variant="h5">Loading...</Typography>
         <br />
         <LinearProgress />
      </Container>
   );
}
