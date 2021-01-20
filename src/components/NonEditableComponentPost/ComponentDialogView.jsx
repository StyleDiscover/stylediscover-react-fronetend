import React from 'react';

//MUI Imports
import {
   Dialog,
   DialogActions,
   DialogContent,
   Paper,
   CardMedia,
   Button,
   makeStyles,
} from '@material-ui/core';

//MUI Icons
import { FavoriteBorder, Favorite } from '@material-ui/icons';

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

export default function ComponentDialogView({
   handleClose,
   open,
   componentPostData,
   sendEventAnalytics,
   userId,
   mainPostId,
   componentId,
   wishlists,
   handleWishlist,
   getWebsiteFromUrl,
}) {
   const classes = useStyle();

   return (
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
               Buy on {getWebsiteFromUrl(componentPostData.page_url)}
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
   );
}
