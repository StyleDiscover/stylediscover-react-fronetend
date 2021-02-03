import React from 'react';

//MUI Imports
import { Paper, CardMedia, makeStyles, Fab } from '@material-ui/core';

//MUI Icons
import { Close } from '@material-ui/icons';

//style MUI
const useStyle = makeStyles({
   imgStyles: {
      height: 0,
      paddingTop: '100%',
      cursor: 'pointer',
      position: 'relative',
   },
   ComponentImageRoot: {
      backgroundPosition: 'top',
   },
   custonFavButton: {
      margin: 0,
      top: -3,
      right: -3,
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

export default function SelectableComponentView({
   componentPostData,
   myComponentData,
   componentId,
   handleRemove,
}) {
   //MUI style classes
   const classes = useStyle();

   return (
      <div>
         <Paper square>
            {
               <CardMedia
                  image={componentPostData.media_url}
                  className={classes.imgStyles}
                  classes={{
                     root: classes.ComponentImageRoot,
                  }}
                  title="Image"
               >
                  {myComponentData.addComponents &&
                  myComponentData.addComponents.includes(componentId) ? (
                     <Fab
                        disabled={myComponentData.loading}
                        onClick={handleRemove}
                        classes={{
                           sizeSmall: classes.customSize,
                           root: classes.custionButtonRoot,
                        }}
                        size="small"
                        aria-label="add"
                        className={classes.custonFavButton}
                     >
                        <Close style={{ width: 15, height: 15 }} />
                     </Fab>
                  ) : (
                     <></>
                  )}
               </CardMedia>
            }
         </Paper>
      </div>
   );
}
