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
         username,
         name,
         email,
         password,
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
