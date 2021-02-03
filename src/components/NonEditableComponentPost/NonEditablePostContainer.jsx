//react imports
import React, { useState, useContext } from 'react';

//for history
import { useHistory } from 'react-router-dom';

//crypto imports
import AES from 'crypto-js/aes';

//hooks
import { useGetComponentId } from 'hooks';

//context and events
import { WishlistContext } from 'context/WishlistContext';
import { UserContext } from 'context/UserContext';
import { addWishlist, removeWishlist } from 'events/WishlistEvents';
import { sendEventAnalytics } from 'events/AnalyticsEvents';
import MediaView from './MediaView';
import ComponentDialogView from './ComponentDialogView';

//Navigation constants
import { LOGIN } from 'navigation/Constants';
import { POST_ENCRYPTION_KEY, WISHLIST_ENCRYPTION_KEY } from 'config/Constants';

export function NonEditablePostContainer({
   componentId,
   mainPostId,
   userId,
   postUsername,
}) {
   //use history
   const history = useHistory();

   //states
   const [open, setOpen] = useState(false); //buy dialog open flag

   //use context
   const { wishlists, wishlistDispatch } = useContext(WishlistContext);
   const { user } = useContext(UserContext);

   //react-query queries
   const {
      data: componentPostData,
      status: componentPostStatus,
   } = useGetComponentId(componentId);

   //encrtypted ID
   const encryptedWishlistId = AES.encrypt(
      `${componentId}`,
      WISHLIST_ENCRYPTION_KEY
   )
      .toString()
      .replace(/\//g, '*');

   const encryptedPostId = AES.encrypt(`${mainPostId}`, POST_ENCRYPTION_KEY)
      .toString()
      .replace(/\//g, '*');

   const encryptedUsername = AES.encrypt(
      `${postUsername}`,
      'DatLp5Rm7RnHe8kk3KbY'
   )
      .toString()
      .replace(/\//g, '*');

   //GUnctions
   //dialog functions
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleWishlist = async (event) => {
      event.stopPropagation();

      const wishlistData = {
         component_id: componentId,
      };

      if (user.isAuthenticated) {
         if (wishlists.wishlists.includes(componentId)) {
            await removeWishlist(
               user.userData.username,
               wishlistData,
               wishlistDispatch
            );
         } else {
            await addWishlist(
               user.userData.username,
               wishlistData,
               wishlistDispatch
            ).then(() => {
               sendEventAnalytics(
                  userId,
                  mainPostId,
                  componentId,
                  'add_wishlist'
               );
            });
         }
      } else {
         history.push(
            `${LOGIN}?wishlist=${encryptedWishlistId}&post=${encryptedPostId}&username=${encryptedUsername}`
         );
      }
   };

   //for component dialog
   const getWebsiteFromUrl = (url) => {
      if (url.toString().split('://')[1].split('.').length > 2) {
         return url.toString().split('://')[1].split('.')[1];
      } else {
         return url.toString().split('://')[1].split('.')[0];
      }
   };

   return (
      <div>
         {componentPostStatus === 'success' && (
            <MediaView
               handleClickOpen={handleClickOpen}
               handleWishlist={handleWishlist}
               wishlists={wishlists}
               componentPostData={componentPostData}
               componentId={componentId}
            />
         )}
         {componentPostStatus === 'success' && (
            <ComponentDialogView
               handleClose={handleClose}
               handleWishlist={handleWishlist}
               wishlists={wishlists}
               mainPostId={mainPostId}
               componentId={componentId}
               componentPostData={componentPostData}
               open={open}
               sendEventAnalytics={sendEventAnalytics}
               userId={userId}
               getWebsiteFromUrl={getWebsiteFromUrl}
            />
         )}
      </div>
   );
}
