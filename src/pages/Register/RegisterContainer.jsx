//react imports
import React, { useContext, useState, useEffect } from 'react';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

//MUI imports
import { Container, Paper, Typography } from '@material-ui/core';

//context and events
import { UserContext } from 'context/UserContext';
import { WishlistContext } from 'context/WishlistContext';
import { registerWithEmail } from 'events/UserEvents';
import RegisterFormView from './RegisterFormView';
import RegisterCheckBoxView from './RegisterCheckBoxView';
import RegisterSubmitButtonView from './RegisterSubmitButtonView';
import { POST_ENCRYPTION_KEY, WISHLIST_ENCRYPTION_KEY } from 'config/Constants';

export function RegisterContainer({ history }) {
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

   //context
   const { user, userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);

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
            WISHLIST_ENCRYPTION_KEY
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
            POST_ENCRYPTION_KEY
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

   //set state
   const handleSetState = (state) => {
      if (state === 'tnc') {
         setTermAndCondition(!termAndCondition);
      } else if (state === 'brand') {
         setIAmBrand(!iAmBrand);
      } else if (state === 'influencer') {
         setIAmInfluencer(!iAmInfluencer);
      }
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         <Paper
            style={{
               padding: 20,
            }}
         >
            <Typography variant="h4">Signup</Typography>
            <form noValidate onSubmit={handleSubmit}>
               <RegisterFormView
                  user={user}
                  username={username}
                  password={password}
                  name={name}
                  email={email}
                  handleChange={handleChange}
               />
               <RegisterCheckBoxView
                  termAndCondition={termAndCondition}
                  iAmInfluencer={iAmInfluencer}
                  iAmBrand={iAmBrand}
                  handleSetState={handleSetState}
               />
               {user.errorData.non_field_errors && (
                  <Typography
                     variant="body2"
                     style={{
                        color: 'red',
                        fontSize: '0.8rem',
                        marginTop: 10,
                     }}
                  >
                     {user.errorData.non_field_errors}
                  </Typography>
               )}
               <RegisterSubmitButtonView
                  user={user}
                  termAndCondition={termAndCondition}
               />
            </form>
         </Paper>
      </Container>
   );
}
