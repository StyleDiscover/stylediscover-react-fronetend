import React from 'react';

//MUI Imports
import {
   Paper,
   Typography,
   TextField,
   Button,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

//MUI Make Styles
const useStyles = makeStyles({
   paperStyles: {
      padding: 20,
   },
   inputStyles: {
      marginTop: 20,
   },
   submitStyles: {
      marginTop: 20,
      marginRight: 10,
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

export default function LoginAsUserFormView({
   user,
   username,
   handleChange,
   handleSubmitChange,
}) {
   //usestyles
   const classes = useStyles();
   return (
      <Paper className={classes.paperStyles}>
         <Typography variant="h4">Login As User</Typography>
         <div
            style={{
               marginTop: 10,
            }}
         >
            <Typography variant="body2" align="justify">
               Enter the username you want to login on behalf of.
            </Typography>
         </div>
         <form noValidate>
            <TextField
               id="username"
               name="username"
               size="small"
               fullWidth={true}
               label="Username"
               type="text"
               value={username}
               helperText={
                  user.errorData.username ? user.errorData.username[0] : null
               }
               error={user.errorData.detail ? true : false}
               onChange={handleChange}
               className={classes.inputStyles}
               variant="outlined"
            />
            <br />
            {user.errorData.detail && (
               <Typography variant="body2" className={classes.customError}>
                  {user.errorData.detail}
               </Typography>
            )}
            <div className="usernameLogin">
               <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disableElevation
                  className={classes.submitStyles}
                  disabled={username === '' || user.loading}
                  onClick={handleSubmitChange}
               >
                  Login
                  {user.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </div>
         </form>
      </Paper>
   );
}
