import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

//lazy loading
import { loadable } from 'react-lazily/loadable';

//navigation constant
import { ANALYTICS } from 'navigation/Constants';

//import context
import { UserContext } from 'context/UserContext';
import { MainPostContext } from 'context/MainPostContext';

//import services
import { updateUserInfo, setUserData } from 'events/UserEvents';
import { sendEmailToAdmin } from 'events/MainPostEvents';

//MUI imports
import { Container, LinearProgress, Typography, Grid } from '@material-ui/core';

//view imports
import CopyRedirectView from './CopyRedirectView';
import NoPostPRView from './NoPostPRView';
import NoPostNoEmailView from './NoPostNoEmailView';
import NoPostEmailView from './NoPostEmailView';
import ButtonGroupView from './ButtonGroupView';
import EditProfileDialogView from './EditProfileDialogView';

//components, ,
const { EditableMainPost } = loadable(() => import('components'));
const { CreateButton } = loadable(() => import('components'));
const { ProfileDetailView } = loadable(() => import('components'));

export function ProfileContainer() {
   //use context
   const { user, userDispatch } = useContext(UserContext);
   const { mainPosts } = useContext(MainPostContext);

   //history
   const history = useHistory();

   //STATES
   // for email
   const [loadingEmail, setLoadingEmail] = useState(false);

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
      setLoadingEmail(true);
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
         setLoadingEmail(false);
      } else {
         window.alert('Error sending message, try again later.');
         setLoadingEmail(false);
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
         <CreateButton />
         {/* CREATE BUTTON ENDS */}

         {/* NO POST STARTS */}
         {mainPosts.mainPosts.length === 0 &&
            user.userData.account_type === 'PR' && <NoPostPRView />}
         {mainPosts.mainPosts.length === 0 &&
            !user.userData.sent_insta_email &&
            user.userData.account_type !== 'PR' && (
               <NoPostNoEmailView
                  loadingEmail={loadingEmail}
                  handleSentInstaEmail={handleSentInstaEmail}
               />
            )}
         {mainPosts.mainPosts.length === 0 &&
            user.userData.sent_insta_email &&
            user.userData.account_type !== 'PR' && <NoPostEmailView />}
         {/* NO POST ENDS */}

         {/* POST STARTS */}
         <Grid container={true} spacing={2}>
            {mainPosts.mainPosts.map((id) => {
               return (
                  <Grid item={true} xs={12} sm={6} lg={4} key={id}>
                     <EditableMainPost id={id} />
                  </Grid>
               );
            })}
         </Grid>
         {/* POST ENDS */}

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
