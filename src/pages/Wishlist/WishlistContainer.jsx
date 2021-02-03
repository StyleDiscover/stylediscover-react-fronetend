//react imports
import React, { useContext, useState, useEffect } from 'react';

//context and events
import { WishlistContext } from 'context/WishlistContext';
import { UserContext } from 'context/UserContext';

//MUI imports
import { Container, Typography } from '@material-ui/core';

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';
import WishlistView from './WishlistView';
import WishlistGoBackToUserView from './WishlistGoBackToUserView';
import WishlistExploreCreatorsView from './WishlistExploreCreatorsView';

import { LoadingBar } from 'components';
import NoWishlistView from './NoWishlistView';

export function WishlistContainer({ history }) {
   //state
   const [postUsername, setPostUsername] = useState(null);

   //use context
   const { wishlists } = useContext(WishlistContext);

   //use effect
   //get wishlist
   useEffect(() => {
      const url_string = window.location.href;
      const url = new URL(url_string);
      if (url.searchParams.get('username')) {
         const postUsernameEncrypted = url.searchParams
            .get('username')
            .toString()
            .replace(/ /g, '+')
            .replace(/\*/g, '/');
         const postUsername = AES.decrypt(
            postUsernameEncrypted,
            'DatLp5Rm7RnHe8kk3KbY'
         ).toString(enc);
         setPostUsername(postUsername);
      }
   }, []);

   return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
         <Container maxWidth="lg" className="margin-top-80">
            <Typography
               variant="h5"
               style={{ marginBottom: 20, textAlign: 'center' }}
            >
               Your Wishlist
            </Typography>
            {wishlists.loading && <LoadingBar />}
            {wishlists.wishlists.length === 0 && <NoWishlistView />}

            <WishlistView wishlists={wishlists} />

            {postUsername && (
               <WishlistGoBackToUserView
                  postUsername={postUsername}
                  history={history}
               />
            )}
         </Container>
         <div
            style={{
               paddingBottom: 125,
            }}
         ></div>
         <WishlistExploreCreatorsView />
      </div>
   );
}
