//react imports
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

//import context and event
import { UserContext } from 'context/UserContext';
import { WishlistContext } from 'context/WishlistContext';
import { loginWithFacebook } from 'events/UserEvents';
import FacebookLoginView from './FacebookLoginView';

export function FacebookLoginContainer({ wishlistId, postId, postUsername }) {
   //use context
   const { user, userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);

   //history
   const history = useHistory();

   //funcitons
   const responseFacebook = (response) => {
      const facebookData = {
         access_token: response.accessToken,
      };
      loginWithFacebook(
         facebookData,
         userDispatch,
         postId,
         wishlistId,
         wishlistDispatch,
         postUsername,
         history
      );
   };

   return <FacebookLoginView user={user} responseFacebook={responseFacebook} />;
}
