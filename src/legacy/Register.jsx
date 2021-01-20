//react imports
import React, { useContext, useState, useEffect } from 'react';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

//context and events
import { UserContext } from '../context/UserContext';
import { WishlistContext } from '../context/WishlistContext';
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

export default function Register(props) {
   //states
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [termAndCondition, setTermAndCondition] = useState(false);
   const [iAmBrand, setIAmBrand] = useState(false);
   const [iAmInfluencer, setIAmInfluencer] = useState(false);
   const [wishlistId, setWishlistId] = useState(null);
   const [postId, setPostId] = useState(null);
   const [postUsername, setPostUsername] = useState(null);

   //MUI classes
   const classes = useStyle();

   //context
   const { user, userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);

   //history
   const { history } = props;

   //use effect
   //get wishlist
   useEffect(() => {
      const url_string = window.location.href;
      const url = new URL(url_string);
      if (url.searchParams.get('wishlist')) {
         const wishlistIdEncrypted = url.searchParams
            .get('wishlist')
            .toString()
            .replace(/ /g, '+')
            .replace(/\*/g, '/');
         const wishlistId = AES.decrypt(
            wishlistIdEncrypted,
            '2yPNdoy1yRQz5gDkg5mx'
         ).toString(enc);
         setWishlistId(wishlistId);
      }
      if (url.searchParams.get('post')) {
         const postIdEncrypted = url.searchParams
            .get('post')
            .toString()
            .replace(/ /g, '+')
            .replace(/\*/g, '/');
         const postId = AES.decrypt(
            postIdEncrypted,
            'Pjmaq7EV2C7lQeaUuLVD'
         ).toString(enc);
         setPostId(postId);
      }
      if (url.searchParams.get('username')) {
         const postUsernameEncrypted = url.searchParams
            .get('username')
            .toString()
            .replace(/ /g, '+');
         setPostUsername(postUsernameEncrypted);
      }
   }, []);

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
         account_type: iAmBrand ? 'BR' : iAmInfluencer ? 'FI' : 'PR',
         modified_username: true,
      };
      await registerWithEmail(
         userData,
         userDispatch,
         postId,
         wishlistId,
         wishlistDispatch,
         postUsername,
         history
      );
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
                        disabled={iAmInfluencer}
                     />
                  }
                  labelPlacement="end"
               />
               <br />
               <FormControlLabel
                  label={
                     <Typography variant="body2">I am an Influencer</Typography>
                  }
                  control={
                     <Checkbox
                        color="primary"
                        checked={iAmInfluencer}
                        onChange={() => setIAmInfluencer(!iAmInfluencer)}
                        disabled={iAmBrand}
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
