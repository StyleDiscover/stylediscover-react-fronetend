//react imports
import React, { useState, useEffect, useContext } from 'react';

//MUI Imports
import {
   Paper,
   Divider,
   makeStyles,
   Typography,
   ListItemText,
   ListItem,
   ListItemAvatar,
   ListItemSecondaryAction,
   Avatar,
   Dialog,
   DialogActions,
   DialogContent,
   Button,
   CardMedia,
} from '@material-ui/core';

//component events import
import { getComponentById } from '../../events/MainPostEvents';

//style MUI
const useStyle = makeStyles({
   imgStyles: {
      height: 0,
      paddingTop: '100%',
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

export default function ComponentAnalyticsCard({ componentId, metrics }) {
   //MUI style classes
   const classes = useStyle();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag

   //GUnctions
   //dialog functions
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      getComponentById(componentId).then((data) => setComponentPostData(data));
   }, []);

   return (
      <div>
         {/* Component Box Starts Here */}
         {componentPostData && (
            <ListItem button={true} onClick={handleClickOpen}>
               <ListItemAvatar>
                  <Avatar
                     src={componentPostData.media_url}
                     variant="square"
                     style={{ borderRadius: 5 }}
                  />
               </ListItemAvatar>

               <ListItemSecondaryAction>
                  <Typography variant="h6">{metrics}</Typography>
               </ListItemSecondaryAction>
            </ListItem>
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
