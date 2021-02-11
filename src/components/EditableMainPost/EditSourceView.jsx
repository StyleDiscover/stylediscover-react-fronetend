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

export default function EditSourceDialog({
   sourceDialog,
   handleEditSourceClose,
   handleEditSourceChange,
   handleEditSourceSubmit,
   status,
   source,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div>
         <Dialog
            maxWidth="lg"
            open={sourceDialog}
            onClose={handleEditSourceClose}
            aria-labelledby="change-source-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 350,
               },
            }}
         >
            <DialogTitle id="change-source-dialog">Edit Source</DialogTitle>
            <DialogContent>
               <TextField
                  variant="outlined"
                  id="source"
                  name="source"
                  size="small"
                  fullWidth={true}
                  label="Source"
                  style={{
                     marginTop: 10,
                     marginBottom: 10,
                  }}
                  onChange={handleEditSourceChange}
                  value={source}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleEditSourceClose}
                  color="inherit"
                  disabled={status === 'loading'}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleEditSourceSubmit}
                  color="primary"
                  variant="contained"
                  disabled={status === 'loading'}
               >
                  Edit Source
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
