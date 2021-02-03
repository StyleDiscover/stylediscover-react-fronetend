import React from 'react';

//MUI imports
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';

//MUI icons
import { Close } from '@material-ui/icons';

export function CustomSnackBar({ openSnackbar, handleClose, message }) {
   return (
      <div>
         <Snackbar
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleClose}
         >
            <SnackbarContent
               style={{ backgroundColor: '#2196f3' }}
               action={
                  <IconButton
                     size="small"
                     aria-label="close"
                     onClick={handleClose}
                     color="inherit"
                  >
                     <Close fontSize="small" />
                  </IconButton>
               }
               message={message}
            />
         </Snackbar>
      </div>
   );
}
