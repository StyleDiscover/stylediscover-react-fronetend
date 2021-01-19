import React from 'react';

//MUI Imports
import {
   Paper,
   makeStyles,
   Typography,
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

//style MUI
const useStyle = makeStyles({
   // ComponentImageRoot: {
   //    backgroundPosition: 'top',
   // },
   dialogPaper: {
      width: 250,
   },
   customBuyButton: {
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

export default function AnalyticsComponentListView({
   componentPostData,
   handleClickOpen,
   metrics,
   handleClose,
   open,
}) {
   //use  style
   const classes = useStyle();
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
