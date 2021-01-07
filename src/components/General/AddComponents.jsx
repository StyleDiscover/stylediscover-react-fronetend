//react imports
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//import my componsnts
import MyComponents from '../Create/MyComponents';

//context and events imports
import { MainPostContext } from '../../context/MainPostContext';
import { MyComponentsContext } from '../../context/MyComponentContext';
import { UserContext } from '../../context/UserContext';
import {
   addComponent,
   getSiteRecord,
   getSiteMedia,
} from '../../events/MainPostEvents';
import { setMyComponents } from '../../events/MyComponentEvents';

//MUI Imports
import {
   makeStyles,
   Typography,
   Paper,
   TextField,
   Button,
   CircularProgress,
   Divider,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
} from '@material-ui/core';

//MUI Icons Import
import { Add, Close } from '@material-ui/icons';
import NonEditableComponentPost from '../ComponentPost/NonEditableComponentPost';

//use styles
const useStyle = makeStyles({
   paperStyles: {
      padding: 20,
   },
   inputStyles: {
      marginTop: 20,
   },
   submitStyles: {
      marginTop: 20,
   },
   customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
   },
   customProgress: {
      marginLeft: 10,
   },
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      width: '100%',
   },
   paperImgStyle: {
      paddingTop: '50%',
      paddingBottom: '50%',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   customCreateButton: {
      fontSize: 50,
      color: '#aaa',
      position: 'absolute',
   },
   customMainImageInput: {
      display: 'None',
   },
   customDialogField: {
      margin: '10px 0px',
      maxWidth: 500,
   },
   customPublishButton: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
   customProgress: {
      marginLeft: 10,
   },
   customCopySnackbar: {
      backgroundColor: '#2196f3',
   },
});

export default function AddComponents({
   mediaType,
   media,
   openDialog = false,
   closeDialog,
   handleSubmit,
}) {
   //MUI classes
   const classes = useStyle();

   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   const { user } = useContext(UserContext);
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

   //use history
   const history = useHistory();

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);
   const [pageUrl, setPageUrl] = useState('');
   const [mediaUrl, setMediaUrl] = useState('');
   const [componentList, setComponentList] = useState([]);

   //flags
   let componentsSeleted = Boolean(myComponentData.addComponents.length > 0);

   //useEffect
   useEffect(() => {
      handleAddDialogOpen(openDialog);
   }, [openDialog]);

   useEffect(() => {
      handleSubmit(componentList);
   }, [componentList]);

   const handleAddDialogClose = () => {
      setAddDialogOpen(false);
      closeDialog(false);
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
   };

   const handleAddDialogOpen = (open) => {
      setPageUrl('');
      setMediaUrl('');
      setAddDialogOpen(open);
   };

   const handlePageUrlChange = (event) => {
      setPageUrl(event.target.value);
   };

   const handleUploadComponentImage = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaUrl(event.target.files[0]);
      }
   };

   const removeDuplicates = async (list) => {
      const componentsToAdd = list.filter(
         (item) => !componentList.includes(item)
      );
      setComponentList([...componentList, ...componentsToAdd]);
   };

   const handleAddDialogSubmit = async (event) => {
      event.preventDefault();
      if (myComponentData.addComponents.length > 0) {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         await removeDuplicates(myComponentData.addComponents);
         componentDispatch({ type: 'UNSET_STATE' });
         handleAddDialogClose();
      } else {
         var siteRecords;
         var hostname;
         var tempComponentId;
         var siteMediaUrl;

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
         siteMediaUrl = await getSiteMedia(hostname, pageUrl, mainPostDispatch);

         var componentData = new FormData();
         componentData.append(
            'media_url',
            !siteMediaUrl && mediaType === 'IM'
               ? mediaUrl
                  ? mediaUrl
                  : media
               : mediaUrl
               ? mediaUrl
               : siteMediaUrl
         );
         componentData.append('page_url', pageUrl);
         componentData.append('site_records', siteRecords);

         tempComponentId = await addComponent(componentData, mainPostDispatch);
         tempComponentId = tempComponentId.toString();

         if (
            !componentList.includes(tempComponentId) &&
            tempComponentId !== '-1'
         ) {
            setComponentList([...componentList, tempComponentId]);
            handleAddDialogClose();
         }
      }
      setMyComponents(user.userData.username, componentDispatch);
   };

   return (
      <div>
         <Dialog
            open={addDialogOpen}
            onClose={handleAddDialogClose}
            aria-labelledby="add-component-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 500,
               },
            }}
         >
            <DialogTitle id="add-component-dialog">
               <Typography variant="h5">Add Component</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
               <Typography variant="subtitle1">
                  <b>Add A Link</b>
               </Typography>
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
                  disabled={componentsSeleted}
               />
               {/* <TextField
                     id="url"
                     label="Media URL"
                     type="url"
                     value={mediaUrl}
                     fullWidth={true}
                     className={classes.customDialogField}
                     helperText={
                        mainPosts.errorData.media_url
                           ? mainPosts.errorData.media_url[0]
                           : null
                     }
                     error={mainPosts.errorData.media_url ? true : false}
                     onChange={handlePageUrlChange}
                     onChange={handleMediaUrlChange}
                     variant="outlined"
                     autoComplete="off"
                     disabled={
                        typeof mediaUrl === 'object' || componentsSeleted
                     }
                  /> */}
               <br />
               <input
                  accept="image/*"
                  className={classes.customMainImageInput}
                  id="upload-component"
                  type="file"
                  onChange={handleUploadComponentImage}
                  disabled={componentsSeleted}
               />
               <label htmlFor="upload-component">
                  <Button
                     variant="outlined"
                     color="primary"
                     className={classes.customPublishButton}
                     component="span"
                     disabled={componentsSeleted}
                  >
                     Choose An Image Instead
                  </Button>
               </label>
               {mainPosts.errorData.media_url && (
                  <Typography variant="body2" className={classes.customError}>
                     Cannot get the image, please uplaod an image instead
                  </Typography>
               )}
               <br />
               <Typography variant="subtitle1">
                  <b>Choose From Used Components</b>
               </Typography>
               <MyComponents />
               <br />
            </DialogContent>

            <DialogActions>
               <Button
                  onClick={handleAddDialogClose}
                  color="inherit"
                  disabled={mainPosts.loading}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleAddDialogSubmit}
                  color="primary"
                  disabled={mainPosts.loading}
               >
                  Add Component
                  {mainPosts.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
