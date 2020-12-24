//react imports
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

//context and events imports
import { MainPostContext } from '../context/MainPostContext';
import {
   addComponent,
   publishMainPost,
   getSiteRecord,
} from '../events/MainPostEvents';

//MUI Imports
import {
   Container,
   makeStyles,
   Typography,
   Paper,
   TextField,
   Button,
   CircularProgress,
   Card,
   CardMedia,
   CardContent,
   Grid,
   Divider,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
} from '@material-ui/core';

//MUI Icons Import
import { Add } from '@material-ui/icons';
import EditableComponentPost from '../components/ComponentPost/EditableComponentPost';

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
   },
   customPublishButton: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function Create() {
   //MUI classes
   const classes = useStyle();

   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);

   //use history
   const history = useHistory();

   //state
   const [media, setMedia] = useState();
   const [mediaPreview, setMediaPreview] = useState();
   const [componentList, setComponentList] = useState([]);
   const [caption, setCaption] = useState('');
   const [mediaType, setMediaType] = useState('IM');

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);
   const [pageUrl, setPageUrl] = useState('');
   const [mediaUrl, setMediaUrl] = useState('');

   //flags
   var canPublish = Boolean(media && componentList.length > 0);

   //funtion
   const addMainPicture = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMedia(event.target.files[0]);
         if (event.target.files[0].type.startsWith('video')) {
            setMediaType('VD');
         } else if (event.target.files[0].type.startsWith('image')) {
            setMediaType('IM');
         }
      }
   };

   const handleAddDialogClose = () => {
      setAddDialogOpen(false);
      mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
   };

   const handleAddDialogOpen = () => {
      setPageUrl('');
      setMediaUrl('');
      setAddDialogOpen(true);
   };

   const handlePageUrlChange = (event) => {
      setPageUrl(event.target.value);
   };

   const handleMediaUrlChange = (event) => {
      setMediaUrl(event.target.value);
   };

   const handleUploadComponentImage = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaUrl(event.target.files[0]);
      }
   };

   const handleAddDialogSubmit = async (event) => {
      event.preventDefault();
      var siteRecords;
      var hostname;
      var tempComponentId;

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

      var componentData = new FormData();
      componentData.append('media_url', mediaUrl);
      componentData.append('page_url', pageUrl);
      componentData.append('site_records', siteRecords);

      tempComponentId = await addComponent(componentData, mainPostDispatch);

      if (!componentList.includes(tempComponentId) && tempComponentId !== -1) {
         setComponentList([...componentList, tempComponentId]);
         handleAddDialogClose();
      }
   };

   const handlePublish = async (event) => {
      event.preventDefault();
      var mainPostData = new FormData();
      mainPostData.append('media_url', media);
      mainPostData.append('media_type', mediaType);
      mainPostData.append('caption', caption);

      await publishMainPost(mainPostData, componentList, mainPostDispatch);

      history.push('/profile');
   };

   return (
      <Container className="margin-top-80" maxWidth="xs">
         <Card>
            {media && mediaType === 'IM' && (
               <CardMedia
                  className={classes.imgStyle}
                  image={mediaPreview}
                  classes={{
                     root: classes.mainPostRoot,
                  }}
               ></CardMedia>
            )}
            {media && mediaType === 'VD' && (
               <CardMedia>
                  <video
                     // controls
                     autoPlay
                     loop
                     muted
                     style={{
                        width: '100%',
                     }}
                  >
                     <source
                        src={mediaPreview}
                        title="Video"
                        type="video/mp4"
                     ></source>
                  </video>
               </CardMedia>
            )}
            {!media && (
               <label
                  className={classes.paperImgStyle}
                  htmlFor="icon-button-file"
               >
                  <input
                     accept="image/*,video/*"
                     className={classes.customMainImageInput}
                     id="icon-button-file"
                     type="file"
                     onChange={addMainPicture}
                  />
                  <div className={classes.customCreateButton}>
                     <Add style={{ fontSize: '40' }} />
                     <Typography
                        variant="body2"
                        style={{
                           color: '#aaa',
                        }}
                     >
                        Add Media
                     </Typography>
                  </div>
               </label>
            )}
            <Divider />
            <CardContent>
               <Grid container spacing={2}>
                  {componentList.length > 0 &&
                     componentList.map((componentId) => {
                        return (
                           <Grid item xs={3} key={componentId}>
                              <EditableComponentPost
                                 componentId={componentId}
                              />
                           </Grid>
                        );
                     })}
                  {componentList.length < 8 && (
                     <Grid item xs={3}>
                        <Paper
                           className={classes.paperImgStyle}
                           variant="outlined"
                           onClick={handleAddDialogOpen}
                           square={true}
                        >
                           <Add className={classes.customCreateButton} />
                        </Paper>
                     </Grid>
                  )}
               </Grid>
            </CardContent>
         </Card>
         <Button
            variant="contained"
            color="primary"
            className={classes.customPublishButton}
            fullWidth={true}
            onClick={handlePublish}
            disableElevation={true}
            disabled={!canPublish || mainPosts.loading}
         >
            Publish
         </Button>
         {/* DIALOG BOXES */}
         {/* DIALOG BOXES */}
         {/* DIALOG BOXES */}
         <div>
            <Dialog
               maxWidth="lg"
               open={addDialogOpen}
               onClose={handleAddDialogClose}
               aria-labelledby="add-component-dialog"
               PaperProps={{
                  style: {
                     backgroundColor: '#eeeeee',
                     color: '#333333',
                  },
               }}
            >
               <DialogTitle id="add-component-dialog">
                  Add Component
               </DialogTitle>
               <DialogContent>
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
                  <TextField
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
                     disabled={typeof mediaUrl === 'object'}
                  />
                  <input
                     accept="image/*"
                     className={classes.customMainImageInput}
                     id="upload-component"
                     type="file"
                     onChange={handleUploadComponentImage}
                  />
                  <label htmlFor="upload-component">
                     <Button
                        variant="outlined"
                        color="primary"
                        className={classes.customPublishButton}
                        component="span"
                     >
                        Choose An Image Instead
                     </Button>
                  </label>
               </DialogContent>
               {/* {errors.detail && (
                  <Typography variant="body2" className={classes.customError}>
                     {errors.detail}
                  </Typography>
               )} */}
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
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      </Container>
   );
}
