import React from 'react';

//MUI imports
import {
   Typography,
   Button,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
   customCreateButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function NoPostNoEmailView({
   handleSentInstaEmail,
   loadingEmail,
}) {
   //classes usestyle
   const classes = useStyles();

   return (
      <div>
         <Typography className={classes.customNoPostMessage} variant="body2">
            <Button
               variant="outlined"
               color="primary"
               className={classes.customCreateButton}
               onClick={handleSentInstaEmail}
               disabled={loadingEmail}
            >
               Import My Last Five Insta Posts
               {loadingEmail && (
                  <CircularProgress
                     size={20}
                     className={classes.customProgress}
                  />
               )}
            </Button>
         </Typography>
      </div>
   );
}
