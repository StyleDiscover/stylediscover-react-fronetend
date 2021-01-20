import React from 'react';

//MUI Imports
import {
   Typography,
   Button,
   Paper,
   TextField,
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

export default function ResetPasswordConfirmFormView({
   user,
   handleChange,
   renew_Password,
   new_password1,
   handleSubmit,
}) {
   //use styles
   const classes = useStyles();
   return (
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
               <Typography variant="body2" className={classes.customError}>
                  {user.errorData.non_field_errors}
               </Typography>
            )}

            {user.errorData.token && (
               <Typography variant="body2" className={classes.customError}>
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
   );
}
