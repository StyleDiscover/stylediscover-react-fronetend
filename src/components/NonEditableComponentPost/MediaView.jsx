import React from 'react';

//MUI Imports
import { Paper, CardMedia, Fab, makeStyles } from '@material-ui/core';

//MUI Icons
import { Favorite, FavoriteBorder } from '@material-ui/icons';

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
});

export default function MediaView({
   handleClickOpen,
   componentPostData,
   wishlists,
   handleWishlist,
   componentId,
}) {
   //use styles
   const classes = useStyle();
   return (
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
   );
}
