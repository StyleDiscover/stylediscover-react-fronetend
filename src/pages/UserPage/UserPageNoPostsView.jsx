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

export default function UserPageNoPostsView() {
   //userstyle
   const classes = useStyles();
   return (
      <Typography className={classes.customNoPostMessage} variant="body2">
         No Posts
      </Typography>
   );
}
