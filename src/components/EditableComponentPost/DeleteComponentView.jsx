import React from 'react';

//MUI Imports
import {
   Dialog,
   DialogTitle,
   DialogContent,
   Typography,
   DialogActions,
   Button,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

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

export default function DeleteComponentView({
   deleteDialogOpen,
   handleDeleteDialogClose,
   mainPosts,
   handleDeletePost,
}) {
   const classes = useStyle();
   return (
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
   );
}
