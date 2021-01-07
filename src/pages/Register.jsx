//react imports
import React, { useContext, useState } from 'react';

//context and events
import { UserContext } from '../context/UserContext';
import { registerWithEmail } from '../events/UserEvents';

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
   FormControlLabel,
   Checkbox,
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
});

export default function Register() {
   //states
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [termAndCondition, setTermAndCondition] = useState(false);
   const [iAmBrand, setIAmBrand] = useState(false);

   //MUI classes
   const classes = useStyle();

   //context
   const { user, userDispatch } = useContext(UserContext);

   //funtions
   const handleChange = (event) => {
      if (event.target.name === 'username') {
         setUsername(event.target.value);
      } else if (event.target.name === 'name') {
         setName(event.target.value);
      } else if (event.target.name === 'email') {
         setEmail(event.target.value);
      } else if (event.target.name === 'password') {
         setPassword(event.target.value);
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const userData = {
         username: username.toLowerCase().replace(/\s/g, ''),
         name,
         email,
         password,
         account_type: iAmBrand ? 'BR' : 'PR',
         modified_username: true,
      };
      await registerWithEmail(userData, userDispatch);
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         <Paper className={classes.paperStyles}>
            <Typography variant="h4">Signup</Typography>
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
                  id="name"
                  name="name"
                  size="small"
                  fullWidth={true}
                  label="Name"
                  type="text"
                  value={name}
                  helperText={user.errorData.name}
                  error={user.errorData.name ? true : false}
                  onChange={handleChange}
                  className={classes.inputStyles}
                  variant="outlined"
               />
               <br />
               <TextField
                  id="email"
                  name="email"
                  size="small"
                  fullWidth={true}
                  label="Email"
                  type="text"
                  value={email}
                  helperText={user.errorData.email}
                  error={user.errorData.email ? true : false}
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
               <br />
               <FormControlLabel
                  label={
                     <Typography variant="body2">
                        I accept the Privacy Policy and{' '}
                        <MUILink
                           to="/policy/termsandconditions"
                           onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              window.open('/policy/termsandconditions');
                           }}
                        >
                           {' '}
                           Terms and Conditions
                        </MUILink>
                     </Typography>
                  }
                  control={
                     <Checkbox
                        color="primary"
                        checked={termAndCondition}
                        onChange={() => setTermAndCondition(!termAndCondition)}
                     />
                  }
                  labelPlacement="end"
               />
               <br />
               <FormControlLabel
                  label={<Typography variant="body2">I am a Brand</Typography>}
                  control={
                     <Checkbox
                        color="primary"
                        checked={iAmBrand}
                        onChange={() => setIAmBrand(!iAmBrand)}
                     />
                  }
                  labelPlacement="end"
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
                     disabled={user.loading || !termAndCondition}
                     className={classes.submitStyles}
                  >
                     Signup
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
      </Container>
   );
}
