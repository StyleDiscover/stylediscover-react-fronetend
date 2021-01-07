import React from 'react';
import { Link } from 'react-router-dom';

//MUI Imports
import { Typography, Button, Container, Paper } from '@material-ui/core';
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

function LoginAfterResetScreen() {
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
               Password Reset Successfully!
            </Typography>
            <br />
            <div
               style={{
                  marginTop: 10,
                  marginBottom: 10,
               }}
            >
               <Typography variant="body1" align="justify">
                  Please login again.
               </Typography>
            </div>
            {/* <Typography variant="body1">Login now!</Typography> */}
            <Button
               className={classes.customHeroButton}
               variant="contained"
               component={Link}
               color="primary"
               to="/login"
               disableElevation
            >
               Login
            </Button>
         </div>
      </Paper>
   );
}

export default LoginAfterResetScreen;
