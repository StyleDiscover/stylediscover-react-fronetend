import React from 'react';

//MUI Imports
import { Paper, CardMedia, makeStyles, Fab } from '@material-ui/core';

//MUI Icons
import { EditOutlined, DeleteOutline } from '@material-ui/icons';

//style MUI
const useStyle = makeStyles({
   imgStyles: {
      height: 0,
      paddingTop: '100%',
      cursor: 'pointer',
      position: 'relative',
   },
   customDeleteButton: {
      margin: 0,
      left: 3,
      bottom: 3,
      position: 'absolute',
      background: '#eee',
      color: 'red',
   },
   customChangeButton: {
      margin: 0,
      bottom: 3,
      right: 3,
      position: 'absolute',
      background: '#eee',
   },
   customSize: {
      height: 20,
      width: 20,
   },
   custiomButtonRoot: {
      minHeight: 0,
   },
});

export default function ComponentImageView({
   handleChangeDialogOpen,
   handleDeleteDialogOpen,
   componentPostData,
   handleClickOpen,
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
               title="Image"
            >
               <Fab
                  onClick={handleDeleteDialogOpen}
                  classes={{
                     sizeSmall: classes.customSize,
                     root: classes.custiomButtonRoot,
                  }}
                  size="small"
                  aria-label="like"
                  className={classes.customDeleteButton}
               >
                  <DeleteOutline style={{ width: 15, height: 15 }} />
               </Fab>
               <Fab
                  onClick={handleChangeDialogOpen}
                  classes={{
                     sizeSmall: classes.customSize,
                     root: classes.custiomButtonRoot,
                  }}
                  size="small"
                  aria-label="like"
                  className={classes.customChangeButton}
               >
                  <EditOutlined style={{ width: 15, height: 15 }} />
               </Fab>
            </CardMedia>
         }
      </Paper>
   );
}
