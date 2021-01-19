//react imports
import React, { useContext, useState, useEffect } from 'react';

//MUI Imports
import { Container, Paper, Typography } from '@material-ui/core';

//context and events
import { UserContext } from 'context/UserContext';
import { WishlistContext } from 'context/WishlistContext';
import { loginWithEmail } from 'events/UserEvents';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import LoginFormView from './LoginFormView';

//compoennts import
import { FacebookLogin } from 'components';
import LoginBottomView from './LoginBottomView';

export function LoginContainer({ history }) {
   //states
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
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
      await loginWithEmail(
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
         <Paper style={{ padding: 20 }}>
            <Typography variant="h4">Login</Typography>

            <LoginFormView
               user={user}
               username={username}
               password={password}
               handleSubmit={handleSubmit}
               handleChange={handleChange}
            />

            <div style={{ marginTop: 15 }}>
               <FacebookLogin
                  wishlistId={wishlistId}
                  postId={postId}
                  postUsername={postUsername}
               />
            </div>

            <LoginBottomView />
         </Paper>
      </Container>
   );
}
