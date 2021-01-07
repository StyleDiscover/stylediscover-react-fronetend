//react imports
import React, { useState, useEffect, useContext } from 'react';

//for history
import { useHistory } from 'react-router-dom';

//context and events
import { MyComponentsContext } from '../../context/MyComponentContext';

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
import { Close } from '@material-ui/icons';

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
}) {
   //MUI style classes
   const classes = useStyle();

   //use history
   const history = useHistory();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag

   //use context
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

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

   const handleRemove = async (event) => {
      event.stopPropagation();
      componentDispatch({ type: 'REMOVE_COMPONENT', id: componentId });
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
         )}
         {/* Component box Ends Here */}
      </div>
   );
}
