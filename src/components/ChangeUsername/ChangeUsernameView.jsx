import React from 'react';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   TextField,
   Link as MUILink,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

//MUI Make Styles
const useStyles = makeStyles({
   inputStyles: {
      marginTop: 10,
   },
   submitStyles: {
      marginTop: 10,
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

export default function ChangeUsernameView({
   user,
   newUsername,
   handleChange,
   handleSubmitChange,
}) {
   //use style
   const classes = useStyles();
   return (
      <div>
         <form noValidate>
            <TextField
               id="username"
               name="username"
               size="small"
               fullWidth={true}
               label="New Username"
               type="text"
               value={newUsername}
               helperText={
                  user.errorData.username ? user.errorData.username[0] : null
               }
               error={user.errorData.username ? true : false}
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
                  size="small"
                  disableElevation
                  className={classes.submitStyles}
                  disabled={newUsername === '' || user.loading}
                  onClick={handleSubmitChange}
               >
                  Change Username
                  {newUsername === '' && user.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
}
