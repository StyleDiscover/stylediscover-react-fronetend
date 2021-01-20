//react imports
import React, { useState, useEffect, useContext } from 'react';

//context and events
import { WishlistContext } from '../../context/WishlistContext';
import { UserContext } from '../../context/UserContext';
import { addWishlist, removeWishlist } from '../../events/WishlistEvents';

//MUI Imports
import { Paper, CardMedia, makeStyles, Button } from '@material-ui/core';

//MUI Icons
import { FavoriteBorder, Favorite } from '@material-ui/icons';

//component events import
import { getComponentById } from '../../events/MainPostEvents';

//style MUI
const useStyle = makeStyles({
   ComponentImageRoot: {
      backgroundPosition: 'top',
   },
   dialogPaper: {
      width: '100%',
   },
   customBuyButton: {
      width: '100%',
      marginTop: 10,
   },
   customFavButton: {
      width: '100%',
      marginTop: 10,
   },
   dialogImgStyles: {
      height: 0,
      paddingTop: '100%',
   },
});

export default function WishlistComponent({ componentId }) {
   //MUI style classes
   const classes = useStyle();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data

   //use context
   const { wishlists, wishlistDispatch } = useContext(WishlistContext);
   const { user } = useContext(UserContext);

   useEffect(() => {
      getComponentById(componentId).then((data) => setComponentPostData(data));
   }, []);

   //Functions
   const handleWishlist = async (event) => {
      event.stopPropagation();

      const wishlistData = {
         component_id: componentId,
      };

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
         );
      }
   };
   return (
      <div>
         {/* WISHLIST COMPONENT STARTS */}
         {componentPostData && (
            <div>
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
            </div>
         )}
         {/* WISHLIST COMPONENT ENDS */}
      </div>
   );
}
