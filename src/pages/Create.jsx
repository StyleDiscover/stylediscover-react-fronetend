//react imports
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//import my componsnts
import MyComponents from '../components/Create/MyComponents';
import AddComponents from '../components/General/AddComponents';

//context and events imports
import { MainPostContext } from '../context/MainPostContext';
import { MyComponentsContext } from '../context/MyComponentContext';
import {
   addComponent,
   publishMainPost,
   getSiteRecord,
   getSiteMedia,
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
   Snackbar,
   SnackbarContent,
   IconButton,
} from '@material-ui/core';

//MUI Icons Import
import { Add, Close } from '@material-ui/icons';
import NonEditableComponentPost from '../components/ComponentPost/NonEditableComponentPost';

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

export default function Create() {
   //MUI classes
   const classes = useStyle();

   //use context
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   const { myComponentData } = useContext(MyComponentsContext);

   //use history
   const history = useHistory();

   //state
   const [media, setMedia] = useState();
   const [mediaPreview, setMediaPreview] = useState();
   const [caption, setCaption] = useState('');
   const [mediaType, setMediaType] = useState('IM');
   const [componentList, setComponentList] = useState([]);

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   //snackbar
   const [openPublishSnackbar, setOpenPublishSnackbar] = useState(false);

   //flags
   let canPublish = Boolean(media && componentList.length > 0);
   let componentsSeleted = Boolean(myComponentData.addComponents.length > 0);

   const addMainPicture = (event) => {
      if (event.target.files && event.target.files[0]) {
         setMediaPreview(URL.createObjectURL(event.target.files[0]));
         setMedia(event.target.files[0]);
         if (event.target.files[0].type.startsWith('video')) {
            setMediaType('VD');
         } else if (event.target.files[0].type.startsWith('image')) {
            setMediaType('IM');
         } else {
            setMediaType('NA');
         }
      }
   };

   const handleAddDialogOpen = () => {
      setAddDialogOpen(true);
   };

   const handlePublish = async (event) => {
      event.preventDefault();
      var mainPostData = new FormData();
      mainPostData.append('media_url', media);
      mainPostData.append('media_type', mediaType);
      mainPostData.append('caption', caption);

      await publishMainPost(
         mainPostData,
         componentList.slice(0, 8),
         mainPostDispatch,
         history
      );
   };

   const handleCloseCopySnackbar = (event, reason) => {
      if (reason === 'clickaway') {
         return;
      }

      setOpenPublishSnackbar(false);
   };

   //hnadleSubmit

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
                              <NonEditableComponentPost
                                 componentId={componentId}
                              />
                           </Grid>
                        );
                     })}
                  {componentList.length < 8 && media && (
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
                  {!media && (
                     <Typography align="center" variant="body1">
                        Please add a media before adding component.
                     </Typography>
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
            {mainPosts.loading && (
               <CircularProgress size={20} className={classes.customProgress} />
            )}
         </Button>
         {/* DIALOG BOXES */}
         {/* DIALOG BOXES */}
         {/* DIALOG BOXES */}
         <AddComponents
            openDialog={addDialogOpen}
            media={media}
            mediaType={mediaType}
            handleSubmit={(list) => {
               setComponentList([...list]);
               console.log(list);
            }}
            closeDialog={(close) => setAddDialogOpen(close)}
         />

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
               message="Link Copied!"
            />
         </Snackbar>
         {/* SNACKBAR ENDS */}
      </Container>
   );
}
