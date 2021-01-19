import React from 'react';
import { Link } from 'react-router-dom';

//navigation constant imports
import { CREATE } from 'navigation/Constants';

//MUI imports
import { Typography, makeStyles, Link as MUILink } from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
});

export default function NoPostEmailView() {
   //classes usestyle
   const classes = useStyles();

   return (
      <Typography className={classes.customNoPostMessage} variant="body2">
         We are adding your last five posts!
         <br />
         <br />
         Sit back and relax
         <br />
         or
         <br />
         <MUILink component={Link} to={CREATE}>
            <b>Create a post now!</b>
         </MUILink>
      </Typography>
   );
}
