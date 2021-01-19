import React from 'react';

//MUI Imports
import {
   Dialog,
   DialogTitle,
   DialogContent,
   CardMedia,
   TextField,
   DialogActions,
   Button,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

//style MUI
const useStyle = makeStyles({
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

export default function ChangeMediaDialogView({
   changeDialogOpen,
   handleChangeDialogClose,
   mediaPreview,
   mainPosts,
   pageUrl,
   handlePageUrlChange,
   mediaUrl,
   handleChangeMedia,
   handleUploadChangeMedia,
}) {
   const classes = useStyle();
   return (
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
   );
}
