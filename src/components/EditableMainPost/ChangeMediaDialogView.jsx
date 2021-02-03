import React from 'react';

//MUI imports
import {
   Dialog,
   DialogActions,
   DialogContent,
   Button,
   makeStyles,
   CardMedia,
   CircularProgress,
   DialogTitle,
} from '@material-ui/core';

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

export default function ChangeMediaDialogView({
   mediaUrl,
   changeDialogOpen,
   handleChangeDialogClose,
   mediaPreview,
   mainPostData,
   status,
   handleUploadChangeMedia,
   handleChangeMedia,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div>
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
                     autoPlay={true}
                     loop={true}
                     muted={true}
                     playsInline={true}
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
                  disabled={status === 'loading'}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleChangeMedia}
                  color="primary"
                  variant="contained"
                  disabled={status === 'loading' || !Boolean(mediaUrl)}
               >
                  Change{' '}
                  {mainPostData &&
                     (mainPostData.media_type === 'VD' ? 'Video' : 'Image')}
                  {status === 'loading' && (
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
