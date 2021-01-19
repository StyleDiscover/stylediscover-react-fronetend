//react imports
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

//crypto imports
import AES from 'crypto-js/aes';

//import component
import EditableComponentPost from '../ComponentPost/EditableComponentPost';
import AddComponents from '../../legacy/AddComponents';

//time ago
import TimeAgo from 'react-timeago';

//context and events imports
import { MainPostContext } from '../../context/MainPostContext';
import {
   getMainPostById,
   editMainPost,
   deleteMainPost,
} from '../../events/MainPostEvents';

//MUI Imports
import {
   Card,
   CardMedia,
   CardContent,
   Grid,
   makeStyles,
   CardHeader,
   Typography,
   Avatar,
   IconButton,
   Menu,
   MenuItem,
   Link as MUILink,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   CircularProgress,
} from '@material-ui/core';

//MUI Icons imports
import { Delete, Edit, MoreVert } from '@material-ui/icons';
import CropperSD from '../../legacy/Cropper';

//MUI make style
const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
   custonFavButton: {
      margin: 0,
      top: 'auto',
      bottom: 55,
      right: 0,
      left: 10,
      position: 'relative',
      background: '#eee',
   },
   customSize: {
      height: 40,
      width: 40,
   },
   custionButtonRoot: {
      minHeight: 0,
   },
   customChangeInput: {
      display: 'None',
   },
   customChangeButton: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      width: '100%',
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function EditableMainPost({ id }) {
   //use styles
   const classes = useStyles();

   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);

   //states
   const [mainPostData, setMainPostData] = useState();
   const [editMenu, setEditMenu] = useState(null);
   const [mediaPreview, setMediaPreview] = useState();

   //edit dialog
   const [changeDialogOpen, setChangeDialogOpen] = useState(false);
   const [cropDialogOpen, setCropDialogOpen] = useState(false);
   const [mediaUrl, setMediaUrl] = useState('');

   //deelte dialog
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);
   const encryptedId = AES.encrypt(`${id}`, 'Pjmaq7EV2C7lQeaUuLVD')
      .toString()
      .replace(/\//g, '*');

   //use history
   const history = useHistory();

   //use effect
   useEffect(() => {
      getMainPostById(id, mainPostDispatch).then((data) =>
         setMainPostData(data)
      );
   }, []);

   //functions
   const OpenEditMenu = (event) => {
      setEditMenu(event.currentTarget);
   };

   const CloseEditMenu = () => {
      setEditMenu(null);
   };

   //for change dialog
   const handleChangeDialogClose = () => {
      setChangeDialogOpen(false);
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
      setMediaPreview();
   };

   const handleChangeDialogOpen = () => {
      setMediaUrl('');
      setChangeDialogOpen(true);
   };

   const handleUploadChangeMedia = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMediaUrl(event.target.files[0]);
         // handleCropDialogOpen();
      }
   };

   const handleChangeMedia = async (event) => {
      event.preventDefault();
      var newMainPostData = new FormData();
      newMainPostData.append('media_url', mediaUrl);
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      await editMainPost(
         newMainPostData,
         mainPostData.id,
         mainPostDispatch
      ).then(async () => {
         await getMainPostById(id, mainPostDispatch).then((data) =>
            setMainPostData(data)
         );
      });
      handleChangeDialogClose();
      CloseEditMenu();
   };

   //for crop
   const handleCropDialogOpen = () => {
      setCropDialogOpen(true);
   };

   //for Delete dialog
   const handleDeleteDialogClose = () => {
      setDeleteDialogOpen(false);
   };

   const handleDeleteDialogOpen = () => {
      setDeleteDialogOpen(true);
   };

   const handleDeletePost = async (event) => {
      event.preventDefault();
      await deleteMainPost(mainPostData.id, mainPostDispatch);
      handleDeleteDialogClose();
   };

   //for adding components
   const handleAddDialogOpen = () => {
      setAddDialogOpen(true);
   };

   const handleAddComponent = async (list) => {
      var newMainPostData = new FormData();
      mainPostData.component_posts.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      list.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      await editMainPost(
         newMainPostData,
         mainPostData.id,
         mainPostDispatch
      ).then(async () => {
         await getMainPostById(id, mainPostDispatch).then((data) =>
            setMainPostData(data)
         );
      });
      handleChangeDialogClose();
      CloseEditMenu();
   };

   return (
      <div>
         {mainPostData && (
            <Card>
               {/* CARD HEADER STARTS */}
               <CardHeader
                  title={
                     <Typography variant="body1" style={{ fontSize: 14 }}>
                        {mainPostData.name
                           ? mainPostData.name
                           : mainPostData.username}
                     </Typography>
                  }
                  subheader={
                     <Typography variant="body2" style={{ fontSize: 11 }}>
                        <TimeAgo
                           date={mainPostData.created_at}
                           minPeriod={30}
                        />
                     </Typography>
                  }
                  avatar={
                     mainPostData.profile_picture !== null ? (
                        <Avatar
                           src={mainPostData.profile_picture}
                           alt={mainPostData.username}
                           style={{
                              width: 30,
                              height: 30,
                           }}
                        ></Avatar>
                     ) : (
                        <Avatar
                           alt={mainPostData.username}
                           style={{
                              width: 30,
                              height: 30,
                           }}
                        ></Avatar>
                     )
                  }
                  action={
                     <div>
                        <IconButton
                           style={{ margin: '0px 5px' }}
                           aria-controls="edit-menu"
                           aria-haspopup="true"
                           onClick={OpenEditMenu}
                        >
                           <MoreVert />
                        </IconButton>
                     </div>
                  }
               ></CardHeader>
               {/* CARD HEADER ENDS */}

               {/* MAIN IMAGE STARTS */}
               {mainPostData.media_type === 'IM' && (
                  <CardMedia
                     className={classes.imgStyle}
                     image={mainPostData.media_url}
                     classes={{
                        root: classes.mainPostRoot,
                     }}
                     onClick={() => {
                        history.push(`/post/${encryptedId}`);
                     }}
                  ></CardMedia>
               )}
               {mainPostData.media_type === 'VD' && (
                  <CardMedia
                     image={mainPostData.media_url}
                     component="video"
                     autoPlay
                     loop
                     muted
                     onClick={() => {
                        history.push(`/post/${encryptedId}`);
                     }}
                     style={{ cursor: 'pointer' }}
                  ></CardMedia>
               )}
               {/* MAIN IMAGE ENDS */}

               {/* COMPONENT IMAGES START */}
               <CardContent>
                  <Grid container={true} spacing={2}>
                     {mainPostData.component_posts.length > 0 &&
                        mainPostData.component_posts
                           .slice(0, 8)
                           .map((componentId) => {
                              return (
                                 <Grid item xs={3} key={componentId}>
                                    <EditableComponentPost
                                       componentId={componentId}
                                       mainPostId={id}
                                       mainPostComponentList={
                                          mainPostData.component_posts
                                       }
                                       userId={mainPostData.user_id}
                                       refreshMainPost={(data) =>
                                          setMainPostData(data)
                                       }
                                    />
                                 </Grid>
                              );
                           })}
                  </Grid>
               </CardContent>
               {/* COMPONENT IMAGES END */}
            </Card>
         )}

         {/* EDIT MENU ITEMS STARTS */}
         <Menu
            id="edit-menu"
            anchorEl={editMenu}
            keepMounted={true}
            open={Boolean(editMenu)}
            onClose={CloseEditMenu}
         >
            <MenuItem onClick={handleChangeDialogOpen}>
               <Typography variant="body1">
                  Change{' '}
                  {mainPostData &&
                     (mainPostData.media_type === 'VD' ? 'Video' : 'Image')}
               </Typography>
            </MenuItem>
            <MenuItem
               onClick={handleAddDialogOpen}
               disabled={
                  mainPostData
                     ? mainPostData.component_posts.length >= 8
                     : false
               }
            >
               <Typography variant="body1">Add Components</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteDialogOpen}>
               <Typography variant="body1" style={{ color: 'red' }}>
                  Delete
               </Typography>
            </MenuItem>
         </Menu>
         {/* EDIT MENU ITEMS ENDS */}

         {/* CROPPING STARTS */}
         {/* <CropperSD
            openDialog={cropDialogOpen}
            image={mediaUrl}
            mediaType={mediaUrl ? mediaUrl.type : 'image/jpeg'}
            mediaName={mediaUrl ? mediaUrl.name : 'example.jpeg'}
            handleSubmit={(croppedImage) => {
               setMediaPreview(croppedImage);
            }}
            handleSubmitFile={(file) => {
               setMediaUrl(file);
            }}
            closeDialog={(close) => setCropDialogOpen(close)}
         /> */}
         {/* CROPPING ENDS */}

         {/* ADD COMPONENT STARTS */}
         {mainPostData && (
            <AddComponents
               openDialog={addDialogOpen}
               media={mainPostData.media_url}
               mediaType={mainPostData.media_type}
               handleSubmit={(list) => {
                  handleAddComponent(list);
               }}
               closeDialog={(close) => setAddDialogOpen(close)}
            />
         )}
         {/* ADD COMPONENT ENDS */}

         {/* CHANGE IMAGE/VIDEO DIALOG STARTS */}
         <Dialog
            maxWidth="lg"
            open={changeDialogOpen}
            onClose={handleChangeDialogClose}
            aria-labelledby="change-component-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 350,
               },
            }}
         >
            <DialogTitle id="change-component-dialog">
               Change{' '}
               {mainPostData &&
                  (mainPostData.media_type === 'VD' ? 'Video' : 'Image')}
            </DialogTitle>
            <DialogContent>
               {mediaPreview && mainPostData.media_type === 'IM' && (
                  <CardMedia
                     className={classes.imgStyle}
                     image={mediaPreview}
                     classes={{
                        root: classes.mainPostRoot,
                     }}
                  ></CardMedia>
               )}
               {mediaPreview && mainPostData.media_type === 'VD' && (
                  <CardMedia
                     image={mediaPreview}
                     component="video"
                     autoPlay
                     loop
                     muted
                  ></CardMedia>
               )}
               {mainPostData && mainPostData.media_type === 'IM' && (
                  <input
                     accept="image/*"
                     className={classes.customChangeInput}
                     id="upload-component"
                     type="file"
                     onChange={handleUploadChangeMedia}
                     disabled={Boolean(mediaUrl)}
                  />
               )}
               {mainPostData && mainPostData.media_type === 'VD' && (
                  <input
                     accept="video/*"
                     className={classes.customChangeInput}
                     id="upload-component"
                     type="file"
                     onChange={handleUploadChangeMedia}
                     disabled={Boolean(mediaUrl)}
                  />
               )}
               <label htmlFor="upload-component">
                  <Button
                     variant="outlined"
                     color="primary"
                     className={classes.customChangeButton}
                     component="span"
                     disabled={Boolean(mediaUrl)}
                  >
                     Choose{' '}
                     {mainPostData &&
                        (mainPostData.media_type === 'VD'
                           ? 'A Video'
                           : 'An Image')}
                  </Button>
               </label>
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleChangeDialogClose}
                  color="inherit"
                  disabled={mainPosts.loading}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleChangeMedia}
                  color="primary"
                  variant="contained"
                  disabled={mainPosts.loading || !Boolean(mediaUrl)}
               >
                  Change{' '}
                  {mainPostData &&
                     (mainPostData.media_type === 'VD' ? 'Video' : 'Image')}
                  {mainPosts.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </DialogActions>
         </Dialog>
         {/* CHANGE IMAGE/VIDEO DIALOG ENDS */}

         {/* DELTE DIALOG STARTS */}
         <Dialog
            maxWidth="lg"
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
            aria-labelledby="delete-component-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 350,
               },
            }}
         >
            <DialogTitle id="delete-component-dialog">Delete Post</DialogTitle>
            <DialogContent>
               <Typography>Delete Post?</Typography>
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleDeleteDialogClose}
                  color="inherit"
                  disabled={mainPosts.loading}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleDeletePost}
                  style={{ color: 'red' }}
                  disabled={mainPosts.loading}
               >
                  Delete
                  {mainPosts.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </DialogActions>
         </Dialog>
         {/* DELTE DIALOG ENDS */}
      </div>
   );
}
