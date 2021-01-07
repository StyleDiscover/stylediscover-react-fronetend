//react imports
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

//Login with facebook
import FacebookLogin from '../components/Login/FacebookLogin';

//context and events
import { UserContext } from '../context/UserContext';
import { loginWithEmail } from '../events/UserEvents';

//MUI Imports
import {
   Container,
   makeStyles,
   Typography,
   Paper,
   TextField,
   Button,
   Link as MUILink,
   CircularProgress,
} from '@material-ui/core';

//use styles
const useStyle = makeStyles({
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
   facebookLogin: {
      marginTop: 15,
   },
});

export default function Login() {
   //states
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   //MUI classes
   const classes = useStyle();

   //context
   const { user, userDispatch } = useContext(UserContext);

   //funtions
   const handleChange = (event) => {
      if (event.target.name === 'username') {
         setUsername(event.target.value);
      }

      if (event.target.name === 'password') {
         setPassword(event.target.value);
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const userData = {
         username,
         password,
      };
      await loginWithEmail(userData, userDispatch);
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         <Paper className={classes.paperStyles}>
            <Typography variant="h4">Login</Typography>
            <form noValidate onSubmit={handleSubmit}>
               <TextField
                  id="username"
                  name="username"
                  size="small"
                  fullWidth={true}
                  label="Username"
                  type="text"
                  value={username}
                  helperText={user.errorData.username}
                  error={user.errorData.username ? true : false}
                  onChange={handleChange}
                  className={classes.inputStyles}
                  variant="outlined"
               />
               <br />
               <TextField
                  id="password"
                  name="password"
                  size="small"
                  fullWidth={true}
                  label="Password"
                  type="password"
                  value={password}
                  helperText={user.errorData.password}
                  error={user.errorData.password ? true : false}
                  onChange={handleChange}
                  className={classes.inputStyles}
                  variant="outlined"
               />
               <br />
               {user.errorData.non_field_errors && (
                  <Typography variant="body2" className={classes.customError}>
                     {user.errorData.non_field_errors}
                  </Typography>
               )}
               <div className="emailLogin">
                  <Button
                     type="submit"
                     color="primary"
                     variant="contained"
                     disableElevation
                     disabled={user.loading}
                     className={classes.submitStyles}
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

            <div className={classes.facebookLogin}>
               <FacebookLogin />
            </div>

            <Typography variant="body2" style={{ marginTop: '20px' }}>
               Don't have an account?
               <MUILink
                  style={{
                     color: '#3064ff',
                     marginLeft: '5px',
                     cursor: 'pointer',
                  }}
                  component={Link}
                  to="/signup"
               >
                  Sign-up
               </MUILink>
            </Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
               Forgot your password?
               <MUILink
                  style={{
                     color: '#3064ff',
                     marginLeft: '5px',
                     cursor: 'pointer',
                  }}
                  component={Link}
                  to="/password/reset"
               >
                  Reset Password
               </MUILink>
            </Typography>
         </Paper>
      </Container>
   );
}
