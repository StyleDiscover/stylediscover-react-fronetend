import React from 'react';

//MUI imports
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   paperStyles: {
      padding: 20,
   },
   inputStyles: {
      marginTop: 20,
   },
   submitStyles: {
      marginTop: 20,
   },
   createAccount: {
      marginLeft: 5,
   },
   customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function RegisterSubmitButtonView({ user, termAndCondition }) {
   const classes = useStyles();
   return (
      <div className="emailLogin">
         <Button
            type="submit"
            color="primary"
            variant="contained"
            disableElevation
            disabled={user.loading || !termAndCondition}
            className={classes.submitStyles}
         >
            Signup
            {user.loading && (
               <CircularProgress size={20} className={classes.customProgress} />
            )}
         </Button>
      </div>
   );
}
