//react imports
import React, { useState, useEffect, useContext } from 'react';

//for history
import { useHistory } from 'react-router-dom';

//crypto imports
import AES from 'crypto-js/aes';

//context and events
import { WishlistContext } from '../../context/WishlistContext';
import { UserContext } from '../../context/UserContext';
import { addWishlist, removeWishlist } from '../../events/WishlistEvents';
import { sendEventAnalytics } from '../../events/AnalyticsEvents';

//MUI Imports
import {
   Paper,
   CardMedia,
   makeStyles,
   Fab,
   Dialog,
   DialogActions,
   DialogContent,
   Button,
   Typography,
} from '@material-ui/core';

//MUI Icons
import { FavoriteBorder, Favorite } from '@material-ui/icons';

//component events import
import { getComponentById } from '../../events/MainPostEvents';

//style MUI
const useStyle = makeStyles({
   imgStyles: {
      height: 0,
      paddingTop: '100%',
      cursor: 'pointer',
      position: 'relative',
   },
   // ComponentImageRoot: {
   //    backgroundPosition: 'top',
   // },
   custonFavButton: {
      margin: 0,
      bottom: 3,
      left: 3,
      position: 'absolute',
      background: '#eee',
   },
   customSize: {
      height: 20,
      width: 20,
   },
   custionButtonRoot: {
      minHeight: 0,
   },
   dialogPaper: {
      width: 250,
   },
   customBuyButton: {
      width: 250,
      marginTop: 10,
   },
   customFavButton: {
      width: 250,
      marginTop: 10,
   },
   customDialogContent: {
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   dialogImgStyles: {
      height: 0,
      paddingTop: '100%',
   },
});

export default function NonEditableComponentPost({
   componentId,
   mainPostId,
   userId,
   postUsername,
}) {
   //MUI style classes
   const classes = useStyle();

   //use history
   const history = useHistory();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag
   const [loadingComponent, setLoadingComponent] = useState(false); //loading component flag

   //use context
   const { wishlists, wishlistDispatch } = useContext(WishlistContext);
   const { user } = useContext(UserContext);

   //encrtypted ID
   const encryptedWishlistId = AES.encrypt(
      `${componentId}`,
      '2yPNdoy1yRQz5gDkg5mx'
   )
      .toString()
      .replace(/\//g, '*');

   const encryptedPostId = AES.encrypt(`${mainPostId}`, 'Pjmaq7EV2C7lQeaUuLVD')
      .toString()
      .replace(/\//g, '*');

   const encryptedUsername = AES.encrypt(
      `${postUsername}`,
      'DatLp5Rm7RnHe8kk3KbY'
   )
      .toString()
      .replace(/\//g, '*');

   useEffect(() => {
      getComponentById(componentId).then((data) => setComponentPostData(data));
   }, []);

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
            `/login?wishlist=${encryptedWishlistId}&post=${encryptedPostId}&username=${encryptedUsername}`
         );
      }
   };

   return (
      <div>
         {/* Component Box Starts Here */}
         {componentPostData && (
            <Paper square>
               {
                  <CardMedia
                     onClick={handleClickOpen}
                     image={componentPostData.media_url}
                     className={classes.imgStyles}
                     // classes={{
                     //    root: classes.ComponentImageRoot,
                     // }}
                     title="Image"
                  >
                     <Fab
                        disabled={wishlists.loading}
                        onClick={handleWishlist}
                        classes={{
                           sizeSmall: classes.customSize,
                           root: classes.custionButtonRoot,
                        }}
                        size="small"
                        aria-label="like"
                        className={classes.custonFavButton}
                     >
                        {wishlists.wishlists &&
                        wishlists.wishlists.includes(componentId) ? (
                           <Favorite style={{ width: 15, height: 15 }} />
                        ) : (
                           <FavoriteBorder style={{ width: 15, height: 15 }} />
                        )}
                     </Fab>
                  </CardMedia>
               }
            </Paper>
         )}
         {/* Component box Ends Here */}

         {/* component dialog start */}
         {componentPostData && (
            <Dialog onClose={handleClose} open={open} maxWidth="sm" fullWidth>
               <DialogContent className={classes.customDialogContent}>
                  <Paper square className={classes.dialogPaper}>
                     <CardMedia
                        image={componentPostData.media_url}
                        className={classes.dialogImgStyles}
                        classes={{
                           root: classes.ComponentImageRoot,
                        }}
                     ></CardMedia>
                  </Paper>
                  <Button
                     className={classes.customBuyButton}
                     variant="contained"
                     color="secondary"
                     onClick={() => {
                        sendEventAnalytics(
                           userId,
                           mainPostId,
                           componentId,
                           'buy_button'
                        );
                        window.open(componentPostData.page_url);
                     }}
                     disableElevation
                  >
                     Buy on {componentPostData.site_records.shop_site}
                  </Button>
                  <br />
                  <Button
                     className={classes.customFavButton}
                     disabled={wishlists.loading}
                     onClick={handleWishlist}
                     variant="outlined"
                     disableElevation
                     startIcon={
                        wishlists.wishlists &&
                        wishlists.wishlists.includes(componentId) ? (
                           <Favorite style={{ width: 15, height: 15 }} />
                        ) : (
                           <FavoriteBorder style={{ width: 15, height: 15 }} />
                        )
                     }
                  >
                     {wishlists.wishlists.includes(componentId) ? (
                        <>Remove</>
                     ) : (
                        <>Add To Wishlist</>
                     )}
                  </Button>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleClose} color="inherit">
                     Close
                  </Button>
               </DialogActions>
            </Dialog>
         )}
         {/* component dialog end */}
      </div>
   );
}
