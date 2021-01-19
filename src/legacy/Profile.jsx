//react imports
import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

//context and events
import { MainPostContext } from '../context/MainPostContext';
import { UserContext } from '../context/UserContext';
import { updateUserInfo } from '../events/UserEvents';
// import { sendEmailToAdmin } from '../events/MainPostEvents';

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
   Icon,
   Dialog,
   DialogTitle,
   DialogContent,
   TextField,
   DialogActions,
} from '@material-ui/core';

//MUI Icons imports
import {
   Add,
   CameraAlt,
   Close,
   Search,
   Favorite,
   AddAPhotoOutlined,
   Launch,
} from '@material-ui/icons';

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
      marginBottom: 10,
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
   customWebsiteButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
      marginBottom: 10,
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
   customProgress: {
      marginLeft: 10,
   },
   customWebsite: {
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      color: 'black',
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

   // for email
   const [loadingEmail, setLoadingEmail] = useState(false);
   const [emailSent, setEmailSent] = useState(false);
   const [accountType, setAccountType] = useState(false);

   //change user info
   const [website, setWebsite] = useState('');
   const [websiteDialogOpen, setWebsiteDialogOpen] = useState(false);

   //use effect
   useEffect(() => {
      setEmailSent(user.userData.sent_insta_email);
      setAccountType(user.userData.account_type);
   }, [user]);

   //markup
   // const firstTimeMarkup = (
   //    <Container maxWidth="sm">
   //       <Paper variant="outlined" style={{ borderRadius: 5, padding: 25 }}>
   //          <Grid container={true} spacing={2}>
   //             <Grid item={true} xs={12} sm={4} style={{ margin: '20px auto' }}>
   //                <MUILink
   //                   component={Link}
   //                   to="/sd/explore"
   //                   style={{ color: '#666666' }}
   //                >
   //                   <Typography align="center">
   //                      <Search style={{ fontSize: 40 }} />
   //                   </Typography>
   //                   <Typography align="center" variant="body1">
   //                      <b>Shop</b>
   //                   </Typography>
   //                   <Typography
   //                      align="center"
   //                      variant="body2"
   //                      style={{ marginTop: 5 }}
   //                   >
   //                      Latest styles of top infuencers
   //                   </Typography>
   //                </MUILink>
   //             </Grid>
   //             <Grid item={true} xs={12} sm={4} style={{ margin: '20px auto' }}>
   //                <MUILink
   //                   component={Link}
   //                   to="/wishlist"
   //                   style={{ color: '#666666' }}
   //                >
   //                   <Typography align="center">
   //                      <Favorite style={{ fontSize: 40 }} />
   //                   </Typography>
   //                   <Typography align="center" variant="body1">
   //                      <b>Wishlist</b>
   //                   </Typography>
   //                   <Typography
   //                      align="center"
   //                      variant="body2"
   //                      style={{ marginTop: 5 }}
   //                   >
   //                      Create a wishlist from all your favorite websites in 1
   //                      place!
   //                   </Typography>
   //                </MUILink>
   //             </Grid>
   //             <Grid item={true} xs={12} sm={4} style={{ margin: '20px auto' }}>
   //                <MUILink
   //                   component={Link}
   //                   to="/create"
   //                   style={{ color: '#666666' }}
   //                >
   //                   <Typography align="center">
   //                      <AddAPhotoOutlined style={{ fontSize: 40 }} />
   //                   </Typography>
   //                   <Typography align="center" variant="body1">
   //                      <b>Create</b>
   //                   </Typography>
   //                   <Typography
   //                      align="center"
   //                      variant="body2"
   //                      style={{ marginTop: 5 }}
   //                   >
   //                      Create your own StyleDiscover feed and showoff your
   //                      personal style!
   //                   </Typography>
   //                </MUILink>
   //             </Grid>
   //          </Grid>
   //       </Paper>
   //    </Container>
   // );

   //function
   //tooltips
   // const DarkTooltip = withStyles(() => ({
   //    tooltip: {
   //       backgroundColor: '#333333',
   //       color: '#eeeeee',
   //       fontSize: 11,
   //    },
   //    arrow: {
   //       color: '#333333',
   //    },
   // }))(Tooltip);

   // //change profile picture
   // const updateProfilePicture = async (event) => {
   //    if (event.target.files && event.target.files[0]) {
   //       var userInfo = new FormData();
   //       userInfo.append('profile_picture', event.target.files[0]);

   //       await updateUserInfo(userInfo, user.userData.username, userDispatch);
   //    }
   // };

   //change userinfo
   const updateUser = async (info) => {
      var userInfo = new FormData();

      if (info === 'website') {
         userInfo.append('user_website', website);
      }
      await updateUserInfo(userInfo, user.userData.username, userDispatch);
   };

   //user info change dialog
   const handleWebsiteDialogClose = () => {
      userDispatch({ type: 'UNSET_ERROR_DATA' });
      setWebsiteDialogOpen(false);
   };

   const handleWebsiteDialogOpen = () => {
      setWebsite('');
      setWebsiteDialogOpen(true);
   };

   //snackbar functions
   // const handleCloseCopySnackbar = (event, reason) => {
   //    if (reason === 'clickaway') {
   //       return;
   //    }

   //    setOpenPublishSnackbar(false);
   // };

   // //email functions
   // const handleSentInstaEmail = async () => {
   //    // setLoadingEmail(true);
   //    const subject = `Import Instagram - ${user.userData.username}`;
   //    const message = `Import last five instagram posts of ${user.userData.username}.`;

   //    const emailStatus = await sendEmailToAdmin(
   //       subject,
   //       message,
   //       user.userData.username
   //    );

   //    if (emailStatus === 200) {
   //       window.alert('We have recieved your message!');
   //       setLoadingEmail(false);
   //       setEmailSent(true);
   //    } else {
   //       window.alert('Error sending message, try again later.');
   //       setLoadingEmail(false);
   //    }
   // };

   return (
      <Container maxWidth="lg" className="margin-top-80">
         <div>
            {/* USER PROFILE PICTURE, USERnAME, NAME STARTS */}

            {/* <div className={classes.customProfilePicture}>
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
            </Typography> */}
            <Container
               maxWidth="xs"
               style={{
                  padding: '0px',
                  margin: '0px auto 20px auto',
                  width: '100%',
               }}
            >
               <Button
                  color="primary"
                  variant="text"
                  className={classes.customWebsiteButton}
                  startIcon={<Launch />}
                  onClick={() => window.open(user.userData.user_website)}
               >
                  <Typography variant="body1">My Website</Typography>
               </Button>
               <Typography
                  variant="body2"
                  align="center"
                  onClick={handleWebsiteDialogOpen}
                  style={{ cursor: 'pointer' }}
               >
                  Change Website
               </Typography>
            </Container>
            {/* USER PROFILE PICTURE, USERnAME, NAME ENDS */}

            {/* USER COPY BUTTON STARTS */}
            {/* <CopyRedirect /> */}
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
            {mainPosts.mainPosts.length === 0 &&
               emailSent &&
               accountType !== 'PR' && (
                  <Typography
                     className={classes.customNoPostMessage}
                     variant="body2"
                  >
                     We are adding your last five posts!
                     <br />
                     <br />
                     Sit back and relax
                     <br />
                     or
                     <br />
                     <MUILink component={Link} to="/create">
                        <b>Create a post now!</b>
                     </MUILink>
                  </Typography>
               )}
            {/* {mainPosts.mainPosts.length === 0 &&
               !emailSent &&
               accountType !== 'PR' && (
                  <Typography
                     className={classes.customNoPostMessage}
                     variant="body2"
                  >
                     <Button
                        variant="outlined"
                        color="primary"
                        className={classes.customCreateButton}
                        onClick={handleSentInstaEmail}
                        disabled={loadingEmail}
                     >
                        Import My Last Five Insta Posts
                        {loadingEmail && (
                           <CircularProgress
                              size={20}
                              className={classes.customProgress}
                           />
                        )}
                     </Button>
                  </Typography>
               )} */}
            {/* {mainPosts.mainPosts.length === 0 &&
               accountType === 'PR' &&
               firstTimeMarkup} */}
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

         {/* CHANGE WEBSITE DIALOG STARTS */}
         <Dialog
            maxWidth="lg"
            open={websiteDialogOpen}
            onClose={handleWebsiteDialogClose}
            aria-labelledby="change-website-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 400,
               },
            }}
         >
            <DialogTitle id="change-website-dialog">Change Website</DialogTitle>
            <DialogContent>
               <TextField
                  id="url"
                  label="New URL"
                  type="url"
                  value={website}
                  fullWidth={true}
                  className={classes.customDialogField}
                  helperText={
                     user.errorData.user_website
                        ? user.errorData.user_website[0]
                        : null
                  }
                  error={user.errorData.user_website ? true : false}
                  onChange={(event) => setWebsite(event.target.value)}
                  variant="outlined"
                  autoComplete="off"
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleWebsiteDialogClose}
                  color="inherit"
                  disabled={user.loading}
               >
                  Cancel
               </Button>
               <Button
                  onClick={() => {
                     updateUser('website');
                  }}
                  color="primary"
                  variant="contained"
                  disabled={user.loading || !Boolean(website)}
               >
                  Change Website
                  {user.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </DialogActions>
         </Dialog>
         {/* CHANGE IMAGE/VIDEO DIALOG ENDS */}
      </Container>
   );
}
