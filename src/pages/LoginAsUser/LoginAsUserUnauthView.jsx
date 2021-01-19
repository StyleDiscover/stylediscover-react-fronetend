import React from 'react';

//MUI Imports
import { Paper, Typography, makeStyles } from '@material-ui/core';

//MUI Make Styles
const useStyles = makeStyles({
   paperStyles: {
      padding: 20,
   },
});
export default function LoginAsUserUnauthView() {
   //use styles
   const classes = useStyles();
   return (
      <Paper className={classes.paperStyles}>
         <Typography>You are not authorized to perform this action.</Typography>
      </Paper>
   );
}
