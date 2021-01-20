//react imports
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

//import context and events
import { UserContext } from '../context/UserContext';
import { resetPasswordConfirm } from '../events/UserEvents';

//components
import LoginAfterResetScreen from '../pages/ResetPasswordConfirm/LoginAfterResetScreenView';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   TextField,
   CircularProgress,
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ResetPasswordConfirm() {
   //use styles
   const classes = useStyles();

   //use context
   const { user, userDispatch } = useContext(UserContext);

   //states
   const [new_password1, setNewPassword] = useState('');
   const [renew_Password, setReNewPassword] = useState('');
   const [resetSuccess, setResetSuccess] = useState(false);

   //get the reset token
   let { uid, token } = useParams();

   //function
   const handleChange = (event) => {
      //set new_password1
      if (event.target.name === 'new_password1') {
         setNewPassword(event.target.value);
      }

      //set new_password2
      if (event.target.name === 'new_password2') {
         setReNewPassword(event.target.value);
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const newPasswordData = {
         uid,
         token,
         new_password1,
         new_password2: renew_Password,
      };

      const result = await resetPasswordConfirm(newPasswordData, userDispatch);

      if (result === 200) {
         setResetSuccess(true);
      }
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         {!resetSuccess && (
            <Paper className={classes.paperStyles}>
               <Typography variant="h4">Reset Password</Typography>
               <form noValidate onSubmit={handleSubmit}>
                  <TextField
                     id="new_password1"
                     name="new_password1"
                     size="small"
                     fullWidth={true}
                     label="New Password"
                     type="password"
                     value={new_password1}
                     helperText={
                        user.errorData.new_password1
                           ? user.errorData.new_password1[0]
                           : null
                     }
                     error={user.errorData.new_password1 ? true : false}
                     onChange={handleChange}
                     className={classes.inputStyles}
                     classes={{
                        root: classes.dialogTextFieldRoot,
                     }}
                     InputProps={{
                        className: classes.dialogTextFieldRoot,
                     }}
                     InputLabelProps={{
                        className: classes.dialogTextFieldRoot,
                     }}
                     variant="outlined"
                     autoComplete="off"
                  />
                  <br />
                  <TextField
                     id="new_password2"
                     name="new_password2"
                     size="small"
                     fullWidth={true}
                     label="Confirm New Password"
                     type="password"
                     value={renew_Password}
                     helperText={
                        user.errorData.new_password2
                           ? user.errorData.new_password2[0]
                           : null
                     }
                     error={user.errorData.new_password2 ? true : false}
                     onChange={handleChange}
                     className={classes.inputStyles}
                     classes={{
                        root: classes.dialogTextFieldRoot,
                     }}
                     InputProps={{
                        className: classes.dialogTextFieldRoot,
                     }}
                     InputLabelProps={{
                        className: classes.dialogTextFieldRoot,
                     }}
                     variant="outlined"
                     autoComplete="off"
                  />
                  <br />
                  {user.errorData.non_field_errors && (
                     <Typography
                        variant="body2"
                        className={classes.customError}
                     >
                        {user.errorData.non_field_errors}
                     </Typography>
                  )}

                  {user.errorData.token && (
                     <Typography
                        variant="body2"
                        className={classes.customError}
                     >
                        {user.errorData.token}
                     </Typography>
                  )}
                  <div className="usernameLogin">
                     <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disableElevation
                        className={classes.submitStyles}
                        disabled={user.loading}
                     >
                        Reset New Password
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
         )}
         {resetSuccess && <LoginAfterResetScreen />}
      </Container>
   );
}
