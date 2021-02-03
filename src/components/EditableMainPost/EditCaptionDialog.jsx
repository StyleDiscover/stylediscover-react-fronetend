import React from 'react';

//MUI imports
import {
   Dialog,
   DialogActions,
   DialogContent,
   Button,
   makeStyles,
   CircularProgress,
   DialogTitle,
   TextField,
} from '@material-ui/core';

//MUI make style
const useStyles = makeStyles({
   customProgress: {
      marginLeft: 10,
      color: '#eeeeee',
   },
});

export default function EditCaptionDialog({
   captionDialog,
   handleEditCaptionClose,
   handleEditCaptionChange,
   handleEditCaptionSubmit,
   status,
   caption,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div>
         <Dialog
            maxWidth="lg"
            open={captionDialog}
            onClose={handleEditCaptionClose}
            aria-labelledby="change-caption-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 350,
               },
            }}
         >
            <DialogTitle id="change-caption-dialog">Edit Caption</DialogTitle>
            <DialogContent>
               <TextField
                  variant="outlined"
                  id="caption"
                  name="caption"
                  size="small"
                  fullWidth={true}
                  label="Caption"
                  multiline={true}
                  rows="3"
                  rowsMax="5"
                  style={{
                     marginTop: 10,
                     marginBottom: 10,
                  }}
                  onChange={handleEditCaptionChange}
                  value={caption}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleEditCaptionClose}
                  color="inherit"
                  disabled={status === 'loading'}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleEditCaptionSubmit}
                  color="primary"
                  variant="contained"
                  disabled={status === 'loading'}
               >
                  Edit Caption
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
