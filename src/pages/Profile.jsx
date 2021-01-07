//react imports
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//context and events
import { MainPostContext } from '../context/MainPostContext';
import { UserContext } from '../context/UserContext';
import { updateUserInfo } from '../events/UserEvents';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   Grid,
   Avatar,
   Link as MUILink,
   makeStyles,
   Badge,
   Tooltip,
   withStyles,
   Fab,
   CircularProgress,
   Snackbar,
   SnackbarContent,
   IconButton,
} from '@material-ui/core';

//MUI Icons imports
import { Add, CameraAlt, Close } from '@material-ui/icons';

//components
import EditableMainPOst from '../components/MainPost/EditableMainPost';
import CopyRedirect from '../components/Profile/CopyRedirect';

//MUI Make Styles
const useStyles = makeStyles({
   customUsername: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customProfilePicture: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
      marginBottom: 20,
   },
   customName: {
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customPaper: {
      paddingTop: 20,
      color: '#333333',
      margin: '20px 0px',
   },
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
   customCreateButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
   },
   customProfileInput: {
      display: 'None',
   },
   customFabButton: {
      width: 30,
      height: 30,
   },
   customSize: {
      height: 20,
      width: 20,
   },
   custiomButtonRoot: {
      minHeight: 0,
   },
   customChangeProPicIcon: {
      width: 20,
      height: 20,
   },

   customCopySnackbar: {
      backgroundColor: '#2196f3',
   },
});

export default function Profile(props) {
   //use styles
   const classes = useStyles();

   //use history
   const history = useHistory();

   //use context
   const { mainPostDispatch, mainPosts } = useContext(MainPostContext);
   const { user, userDispatch } = useContext(UserContext);

   //created a new post flag
   const [openPublishSnackbar, setOpenPublishSnackbar] = useState(false);

   // use effect

   //function
   //tooltips
   const DarkTooltip = withStyles(() => ({
      tooltip: {
         backgroundColor: '#333333',
         color: '#eeeeee',
         fontSize: 11,
      },
      arrow: {
         color: '#333333',
      },
   }))(Tooltip);

   //change profile picture
   const updateProfilePicture = async (event) => {
      if (event.target.files && event.target.files[0]) {
         var userInfo = new FormData();
         userInfo.append('profile_picture', event.target.files[0]);

         await updateUserInfo(userInfo, user.userData.username, userDispatch);
      }
   };

   //snackbar functions
   const handleCloseCopySnackbar = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpenPublishSnackbar(false);
   };

   return (
      <Container maxWidth="lg" className="margin-top-80">
         <div>
            {/* USER PROFILE PICTURE, USERnAME, NAME STARTS */}

            <div className={classes.customProfilePicture}>
               {user.userData.profile_picture !== null ? (
                  <Badge
                     overlap="circle"
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                     }}
                     badgeContent={
                        <div>
                           <input
                              accept="image/*"
                              className={classes.customProfileInput}
                              id="icon-button-file"
                              type="file"
                              onChange={updateProfilePicture}
                           />
                           <label htmlFor="icon-button-file">
                              {!user.loading && (
                                 <DarkTooltip title="Update Picture" arrow>
                                    <Fab
                                       component="span"
                                       className={classes.customFabButton}
                                       classes={{
                                          sizeSmall: classes.customSize,
                                          root: classes.custiomButtonRoot,
                                       }}
                                    >
                                       <CameraAlt
                                          className={
                                             classes.customChangeProPicIcon
                                          }
                                       />
                                    </Fab>
                                 </DarkTooltip>
                              )}
                              {user.loading && (
                                 <Fab
                                    component="span"
                                    className={classes.customFabButton}
                                    disabled
                                 >
                                    <CircularProgress size={15} />
                                 </Fab>
                              )}
                           </label>
                        </div>
                     }
                  >
                     <Avatar
                        style={{
                           margin: '0px auto 10px auto',
                           width: 75,
                           height: 75,
                        }}
                        src={user.userData.profile_picture}
                        alt={user.userData.username}
                     ></Avatar>
                  </Badge>
               ) : (
                  <Badge
                     overlap="circle"
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                     }}
                     badgeContent={
                        <div>
                           <input
                              accept="image/*"
                              className={classes.customProfileInput}
                              id="icon-button-file"
                              type="file"
                              onChange={updateProfilePicture}
                           />
                           <label htmlFor="icon-button-file">
                              {!user.loading && (
                                 <DarkTooltip title="Update Picture" arrow>
                                    <Fab
                                       component="span"
                                       className={classes.customFabButton}
                                       classes={{
                                          sizeSmall: classes.customSize,
                                          root: classes.custiomButtonRoot,
                                       }}
                                    >
                                       <CameraAlt
                                          className={
                                             classes.customChangeProPicIcon
                                          }
                                       />
                                    </Fab>
                                 </DarkTooltip>
                              )}
                              {user.loading && (
                                 <Fab
                                    component="span"
                                    className={classes.customFabButton}
                                    disabled
                                 >
                                    <CircularProgress size={15} />
                                 </Fab>
                              )}
                           </label>
                        </div>
                     }
                  >
                     <Avatar
                        style={{
                           margin: '0px auto 10px auto',
                           width: 75,
                           height: 75,
                        }}
                        alt={user.userData.username}
                     ></Avatar>
                  </Badge>
               )}
            </div>
            <Typography variant="body1" className={classes.customUsername}>
               @{user.userData.username}
            </Typography>
            <Typography variant="h6" className={classes.customName}>
               {user.userData.name}
            </Typography>
            {/* USER PROFILE PICTURE, USERnAME, NAME ENDS */}

            {/* USER COPY BUTTON STARTS */}
            <CopyRedirect />
            {/* USER COPY BUTTON ENDS */}

            {/* ADD BUTTON STARTS */}
            <Container
               maxWidth="xs"
               style={{
                  padding: '0px',
                  margin: '20px auto',
                  width: '100%',
               }}
            >
               <Button
                  variant="contained"
                  color="primary"
                  className={classes.customCreateButton}
                  startIcon={<Add />}
                  onClick={() => history.push('/create')}
               >
                  Create A Post
               </Button>
            </Container>
            {/* ADD BUTTON ENDS */}

            {/* USER POSTS STARTS */}
            {mainPosts.mainPosts.length === 0 && (
               <Typography
                  className={classes.customNoPostMessage}
                  variant="body2"
               >
                  No Posts
               </Typography>
            )}
            <Grid container={true} spacing={2}>
               {mainPosts.mainPosts.map((id) => {
                  return (
                     <Grid item={true} xs={12} sm={6} lg={4} key={id}>
                        <EditableMainPOst id={id} />
                     </Grid>
                  );
               })}
            </Grid>
            {/* USER POSTS ENDS */}
         </div>

         {/* SNACKBAR STARTS*/}
         <Snackbar
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            open={openPublishSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseCopySnackbar}
         >
            <SnackbarContent
               className={classes.customCopySnackbar}
               action={
                  <IconButton
                     size="small"
                     aria-label="close"
                     onClick={handleCloseCopySnackbar}
                     color="inherit"
                  >
                     <Close fontSize="small" />
                  </IconButton>
               }
               message="Published!"
            />
         </Snackbar>
         {/* SNACKBAR ENDS */}
      </Container>
   );
}
