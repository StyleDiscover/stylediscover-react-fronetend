//react imports
import React, { useContext, useState } from 'react';

//component imports
import ResetEmailSentScreenView from '../pages/ResetPassword/ResetEmailSentScreenView';

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

//context and events import
import { UserContext } from '../context/UserContext';
import { resetPasswordSend } from '../events/UserEvents';

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
export default function ResetPassword(props) {
   //use styles
   const classes = useStyles();

   //use state
   const [email, setEmail] = useState('');
   const [emailSent, setEmailSent] = useState(false);

   //use context
   const { user, userDispatch } = useContext(UserContext);

   //use history
   let history = props.history;

   //funtions
   const handleChange = (event) => {
      //set email
      if (event.target.name === 'email') {
         setEmail(event.target.value);
      }
   };

   const handleSubmitChange = async (event) => {
      event.preventDefault();

      const emailData = {
         email,
      };

      const result = await resetPasswordSend(emailData, userDispatch);

      if (result === 200) {
         setEmailSent(true);
      }
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         {!emailSent && (
            <Paper className={classes.paperStyles}>
               <Typography variant="h4">Reset Password</Typography>
               <div
                  style={{
                     marginTop: 10,
                  }}
               >
                  <Typography variant="body2" align="justify">
                     Enter the email address you used to create an account on
                     StyleDiscover.
                  </Typography>
               </div>
               <form noValidate>
                  <TextField
                     id="email"
                     name="email"
                     size="small"
                     fullWidth={true}
                     label="Email"
                     type="text"
                     value={email}
                     helperText={
                        user.errorData.email ? user.errorData.email[0] : null
                     }
                     error={user.errorData.email ? true : false}
                     onChange={handleChange}
                     className={classes.inputStyles}
                     variant="outlined"
                     disabled={user.userData.modified_username}
                  />
                  <br />
                  {user.errorData.detail && (
                     <Typography
                        variant="body2"
                        className={classes.customError}
                     >
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
                        disabled={email === '' || user.loading}
                        onClick={handleSubmitChange}
                     >
                        Send Reset Link
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
         {emailSent && <ResetEmailSentScreenView />}
      </Container>
   );
}
