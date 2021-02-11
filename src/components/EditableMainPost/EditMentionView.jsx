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
} from '@material-ui/core';
import { SearchUser } from 'components';

//MUI make style
const useStyles = makeStyles({
   customProgress: {
      marginLeft: 10,
      color: '#eeeeee',
   },
});

export default function EditMentionDialog({
   mentionDialog,
   handleEditMentionClose,
   handleEditMentionChange,
   handleEditMentionSubmit,
   status,
   mention,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div>
         <Dialog
            maxWidth="lg"
            open={mentionDialog}
            onClose={handleEditMentionClose}
            aria-labelledby="change-mention-dialog"
            PaperProps={{
               style: {
                  backgroundColor: '#eeeeee',
                  color: '#333333',
                  width: 350,
               },
            }}
         >
            <DialogTitle id="change-mention-dialog">Photo Of</DialogTitle>
            <DialogContent>
               <SearchUser
                  handleSelect={(val) => handleEditMentionChange(val)}
                  defaultUser={mention}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleEditMentionClose}
                  color="inherit"
                  disabled={status === 'loading'}
               >
                  Cancel
               </Button>
               <Button
                  onClick={handleEditMentionSubmit}
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
