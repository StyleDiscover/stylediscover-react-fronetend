//react imports
import React, { useState, useEffect, useContext } from 'react';

//context and events
import { UserContext } from '../../context/UserContext';
import { MainPostContext } from '../../context/MainPostContext';
import { sendEventAnalytics } from '../../events/AnalyticsEvents';

//MUI Imports
import {
   Paper,
   CardMedia,
   makeStyles,
   Fab,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Button,
   Typography,
   CircularProgress,
   TextField,
} from '@material-ui/core';

//MUI Icons
import {
   FavoriteBorder,
   Favorite,
   EditOutlined,
   DeleteOutline,
} from '@material-ui/icons';

//component events import
import {
   getComponentById,
   addComponent,
   editMainPost,
   getMainPostById,
   getSiteRecord,
} from '../../events/MainPostEvents';
import CropperSD from '../General/Cropper';

//style MUI
const useStyle = makeStyles({
   imgStyles: {
      height: 0,
      paddingTop: '100%',
      cursor: 'pointer',
      position: 'relative',
   },
   // ComponentImageRoot: {
   //    backgroundPosition: 'top',
   // },
   customDeleteButton: {
      margin: 0,
      left: 3,
      bottom: 3,
      position: 'absolute',
      background: '#eee',
      color: 'red',
   },
   customChangeButton: {
      margin: 0,
      bottom: 3,
      right: 3,
      position: 'absolute',
      background: '#eee',
   },
   customSize: {
      height: 20,
      width: 20,
   },
   custiomButtonRoot: {
      minHeight: 0,
   },
   dialogPaper: {
      width: 250,
   },
   customBuyButton: {
      width: 250,
      marginTop: 10,
   },
   customFavButton: {
      width: 250,
      marginTop: 10,
   },
   customDialogContent: {
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   dialogImgStyles: {
      height: 0,
      paddingTop: '100%',
   },
   customChangeInput: {
      display: 'None',
   },
   customChangeMediaButton: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      width: '100%',
   },
   customProgress: {
      marginLeft: 10,
   },
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
   },
});

export default function EditableComponentPost({
   componentId,
   mainPostId,
   mainPostComponentList,
   userId,
   refreshMainPost,
}) {
   //MUI style classes
   const classes = useStyle();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag
   const [mediaPreview, setMediaPreview] = useState();

   //deelte dialog
   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

   //edit dialog
   const [changeDialogOpen, setChangeDialogOpen] = useState(false);
   const [cropDialogOpen, setCropDialogOpen] = useState(false);
   const [mediaUrl, setMediaUrl] = useState('');
   const [pageUrl, setPageUrl] = useState();

   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   const { user } = useContext(UserContext);

   useEffect(() => {
      getComponentById(componentId).then((data) => {
         setComponentPostData(data);
         setPageUrl(data.page_url);
      });
   }, [componentId]);

   //GUnctions
   //dialog functions
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   //for change dialog
   const handleChangeDialogClose = () => {
      setChangeDialogOpen(false);
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
      setMediaPreview();
   };

   const handleChangeDialogOpen = (event) => {
      event.stopPropagation();
      setMediaUrl('');
      setChangeDialogOpen(true);
   };

   const handleUploadChangeMedia = (event) => {
      if (event.target.files && event.target.files[0]) {
         // setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMediaUrl(event.target.files[0]);
         handleCropDialogOpen();
      }
   };

   const handleChangeMedia = async (event) => {
      event.preventDefault();
      var siteRecords;
      var hostname;
      var newComponentList = mainPostComponentList.filter(
         (mainPostComponent) => mainPostComponent !== componentId
      );

      //get the new media id
      if (pageUrl.startsWith('http')) {
         var tempPageUrl = new URL(pageUrl);
         var tempHostname = tempPageUrl.hostname.toString();
         if (tempHostname.startsWith('www')) {
            hostname = tempHostname.substring(4);
         } else {
            hostname = tempHostname;
         }
      }

      siteRecords = await getSiteRecord(hostname);

      //set component data for new component
      var newComponentData = new FormData();
      newComponentData.append('media_url', mediaUrl);
      newComponentData.append('page_url', pageUrl);
      newComponentData.append(
         'site_records',
         componentPostData.site_records.id
      );
      newComponentData.append('site_records', siteRecords);

      // get a new component id
      const newComponentId = await addComponent(
         newComponentData,
         mainPostDispatch
      );
      if (!newComponentList.includes(newComponentId) && newComponentId !== -1) {
         newComponentList = [...newComponentList, newComponentId];
      }

      //edit main post
      var newMainPostData = new FormData();
      newComponentList.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      await editMainPost(newMainPostData, mainPostId, mainPostDispatch).then(
         async () => {
            await getComponentById(newComponentId).then((data) => {
               setComponentPostData(data);
               setPageUrl(data.page_url);
            });
         }
      );
      componentId = newComponentId;
      handleChangeDialogClose();
   };

   const handlePageUrlChange = (event) => {
      setPageUrl(event.target.value);
   };

   //for Delete dialog
   const handleDeleteDialogClose = () => {
      setDeleteDialogOpen(false);
   };

   const handleDeleteDialogOpen = (event) => {
      event.stopPropagation();
      setDeleteDialogOpen(true);
   };

   const handleDeletePost = async (event) => {
      event.preventDefault();
      var newComponentList = mainPostComponentList.filter(
         (component) => component !== componentId
      );

      var newMainPostData = new FormData();
      newComponentList.forEach((component) => {
         newMainPostData.append('component_posts', component);
      });

      await editMainPost(newMainPostData, mainPostId, mainPostDispatch).then(
         async () => {
            await getMainPostById(mainPostId, mainPostDispatch).then((data) =>
               refreshMainPost(data)
            );
         }
      );
      handleDeleteDialogClose();
   };

   //for crop
   const handleCropDialogOpen = () => {
      setCropDialogOpen(true);
   };

   return (
      <div>
         {/* Component Box Starts Here */}
         {componentPostData && (
            <Paper square>
               {
                  <CardMedia
                     onClick={handleClickOpen}
                     image={componentPostData.media_url}
                     className={classes.imgStyles}
                     // classes={{
                     //    root: classes.ComponentImageRoot,
                     // }}
                     title="Image"
                  >
                     <Fab
                        // disabled={wishlists.loading}
                        onClick={handleDeleteDialogOpen}
                        classes={{
                           sizeSmall: classes.customSize,
                           root: classes.custiomButtonRoot,
                        }}
                        size="small"
                        aria-label="like"
                        className={classes.customDeleteButton}
                     >
                        <DeleteOutline style={{ width: 15, height: 15 }} />
                     </Fab>
                     <Fab
                        // disabled={wishlists.loading}
                        onClick={handleChangeDialogOpen}
                        classes={{
                           sizeSmall: classes.customSize,
                           root: classes.custiomButtonRoot,
                        }}
                        size="small"
                        aria-label="like"
                        className={classes.customChangeButton}
                     >
                        <EditOutlined style={{ width: 15, height: 15 }} />
                     </Fab>
                  </CardMedia>
               }
            </Paper>
         )}
         {/* Component box Ends Here */}

         {/* component dialog start */}
         {componentPostData && (
            <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
               <DialogContent className={classes.customDialogContent}>
                  <Paper square className={classes.dialogPaper}>
                     <CardMedia
                        image={componentPostData.media_url}
                        className={classes.dialogImgStyles}
                        classes={{
                           root: classes.ComponentImageRoot,
                        }}
                     ></CardMedia>
                  </Paper>
                  <Button
                     className={classes.customBuyButton}
                     variant="contained"
                     color="secondary"
                     onClick={() => {
                        sendEventAnalytics(
                           userId,
                           mainPostId,
                           componentId,
                           'buy_button'
                        );
                        window.open(componentPostData.page_url);
                     }}
                     disableElevation
                  >
                     Buy on {componentPostData.site_records.shop_site}
                  </Button>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} color="inherit">
                     Close
                  </Button>
               </DialogActions>
            </Dialog>
         )}
         {/* component dialog end */}

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
                  width: 400,
               },
            }}
         >
            <DialogTitle id="change-component-dialog">
               Change Component Image
            </DialogTitle>
            <DialogContent>
               {mediaPreview && (
                  <CardMedia
                     className={classes.imgStyle}
                     image={mediaPreview}
                     classes={{
                        root: classes.mainPostRoot,
                     }}
                  ></CardMedia>
               )}
               <br />
               <TextField
                  id="title"
                  label="Page URL"
                  type="title"
                  value={pageUrl}
                  fullWidth={true}
                  className={classes.customDialogField}
                  helperText={
                     mainPosts.errorData.page_url
                        ? mainPosts.errorData.page_url[0]
                        : null
                  }
                  error={mainPosts.errorData.page_url ? true : false}
                  onChange={handlePageUrlChange}
                  variant="outlined"
                  autoComplete="off"
               />
               <br />
               <input
                  accept="image/*"
                  className={classes.customChangeInput}
                  id="upload-component"
                  type="file"
                  onChange={handleUploadChangeMedia}
                  disabled={Boolean(mediaUrl)}
               />
               <label htmlFor="upload-component">
                  <Button
                     variant="outlined"
                     color="primary"
                     className={classes.customChangeMediaButton}
                     component="span"
                     disabled={Boolean(mediaUrl)}
                  >
                     Choose Image
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
                  Change Image
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

         {/* CROPPING STARTS */}
         <CropperSD
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
         />
         {/* CROPPING ENDS */}

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
            <DialogTitle id="delete-component-dialog">
               Delete Component
            </DialogTitle>
            <DialogContent>
               <Typography>Delete Component?</Typography>
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
