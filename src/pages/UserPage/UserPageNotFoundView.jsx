import React from 'react';

//MUI Imports
import { Typography, makeStyles } from '@material-ui/core';

//MUI Make Styles
const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
});

export default function UserPageNotFoundView() {
   //userstyle
   const classes = useStyles();
   return (
      <div>
         <Typography className={classes.customNoPostMessage}>
            404 USER NOT FOUND
         </Typography>
      </div>
   );
}
