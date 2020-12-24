//react imports
import React, { useState, useEffect } from 'react';

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
   },
   ComponentImageRoot: {
      backgroundPosition: 'top',
   },
   custonFavButton: {
      margin: 0,
      top: 'auto',
      bottom: 27,
      right: 20,
      left: 2,
      position: 'relative',
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

export default function EditableComponentPost({ componentId }) {
   //MUI style classes
   const classes = useStyle();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag
   const [loadingComponent, setLoadingComponent] = useState(false); //loading component flag

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

   return (
      <div>
         {/* Component Box Starts Here */}
         {componentPostData && (
            <Paper square variant="">
               {
                  <CardMedia
                     onClick={handleClickOpen}
                     image={componentPostData.media_url}
                     className={classes.imgStyles}
                     classes={{
                        root: classes.ComponentImageRoot,
                     }}
                     title="Image"
                  >
                     {/* <Fab disabled={wishlistInProgress} onClick={ handleWishlist }  classes={{sizeSmall: classes.customSize, root: classes.custionButtonRoot}} size="small" aria-label="like" className={ classes.custonFavButton }>
                    {
                        !(Object.entries(wishlistData.content).length === 0) && isWishlisted === true ?
                        wishlistData.content.map(data => {
                            if(data.id === compId){
                                return <FavoriteIcon style={ { width:15, height:15 } } /> 
                            }
                            return true
                        }) :
                        <FavoriteBorderIcon style={ { width:15, height:15 } } />
                    }
                </Fab> */}
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
                        window.open(componentPostData.page_url);
                     }}
                     disableElevation
                  >
                     Buy on {componentPostData.site_records.shop_site}
                  </Button>
                  <br />
                  {/* <Button
                  className={classes.customFavButton}
                  disabled={wishlistInProgress}
                  onClick={handleWishlist}
                  variant="outlined"
                  disableElevation
                  startIcon={
                     !(Object.entries(wishlistData.content).length === 0) &&
                     isWishlisted === true ? (
                        wishlistData.content.map((data) => {
                           if (data.id === compId) {
                              return (
                                 <FavoriteIcon
                                    style={{ width: 20, height: 20 }}
                                 />
                              );
                           }
                           return true;
                        })
                     ) : (
                        <FavoriteBorderIcon style={{ width: 20, height: 20 }} />
                     )
                  }
               >
                  {isWishlisted ? <>Remove</> : <>Add To Wishlist</>}
               </Button> */}
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
