import React from 'react';

//MUI imports
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

//MUI make style
const useStyles = makeStyles({
   customProgress: {
      marginLeft: 10,
   },
});

export default function DeleteMediaDialogView({
   deleteDialogOpen,
   handleDeleteDialogClose,
   mainPosts,
   handleDeletePost,
}) {
   //usestyle
   const classes = useStyles();

   return (
      <div>
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
      </div>
   );
}
