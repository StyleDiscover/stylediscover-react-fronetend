import React from 'react';

//MUI Imports
import {
   Dialog,
   DialogContent,
   Paper,
   CardMedia,
   Button,
   DialogActions,
   makeStyles,
} from '@material-ui/core';

//style MUI
const useStyle = makeStyles({
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

export default function ComponentDialogView({
   handleClose,
   open,
   componentPostData,
   sendEventAnalytics,
   userId,
   mainPostId,
   componentId,
   getWebsiteFromUrl,
}) {
   const classes = useStyle();

   return (
      componentPostData && (
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
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color="inherit">
                  Close
               </Button>
            </DialogActions>
         </Dialog>
      )
   );
}
