import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   Link as MUILink,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

//MUI Make Styles
const useStyles = makeStyles({
   paperStyles: {
      padding: 20,
   },
   customVerifiedText: {
      marginLeft: '10px',
      fontSize: '30px',
      color: 'green',
   },
   customHeroButton: {
      marginTop: 10,
      width: '100%',
   },
});

function ResetEmailSentScreen() {
   //use styles
   const classes = useStyles();

   return (
      <Paper className={classes.paperStyles}>
         <div>
            <Check style={{ fontSize: 25, color: 'green' }} />
            <Typography
               variant="h4"
               className={classes.customVerifiedText}
               display="inline"
            >
               Reset Link Sent!
            </Typography>
            <br />
            <div
               style={{
                  marginTop: 10,
               }}
            >
               <Typography variant="body1" align="justify">
                  Please check your email for reset link.
               </Typography>
            </div>
         </div>
      </Paper>
   );
}

export default ResetEmailSentScreen;
