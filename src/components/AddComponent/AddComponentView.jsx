import React from 'react';

//lazy loading
import { loadable } from 'react-lazily/loadable';

//MUI Imports
import {
   makeStyles,
   Typography,
   Container,
   TextField,
   Button,
   CircularProgress,
   Divider,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   CardMedia,
} from '@material-ui/core';

//components import
const { MyComponents } = loadable(() => import('components'));

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
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
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

export default function AddComponentView({
   addDialogOpen,
   handleAddDialogClose,
   pageUrl,
   mainPosts,
   handlePageUrlChange,
   componentsSeleted,
   handleUploadComponentImage,
   handleAddDialogSubmit,
   mediaPreview,
}) {
   const classes = useStyle();
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
               <Container style={{ maxWidth: 300 }}>
                  {mediaPreview && (
                     <CardMedia
                        className={classes.imgStyle}
                        image={mediaPreview}
                        classes={{
                           root: classes.mainPostRoot,
                        }}
                     ></CardMedia>
                  )}
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
                        fullWidth={true}
                     >
                        Choose An Image Instead
                     </Button>
                  </label>
               </Container>
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
