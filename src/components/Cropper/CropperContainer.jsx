import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import Button from '@material-ui/core/Button';
import { getOrientation } from 'get-orientation/browser';
import { getCroppedImg, getRotatedImage } from '../../utils/CropUtils';
//MUI Imports
import {
   Typography,
   CircularProgress,
   Divider,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   makeStyles,
} from '@material-ui/core';

const ORIENTATION_TO_ANGLE = {
   3: 180,
   6: 90,
   8: -90,
};

//use styles
const useStyle = makeStyles({
   cropContainer: {
      position: 'relative',
      width: '100%',
      height: 200,
      background: '#333',
   },
   cropButton: {
      flexShrink: 0,
      marginLeft: 16,
   },
   sliderContainer: {
      display: 'flex',
      flex: '1',
      alignItems: 'center',
   },
});
export function CropperContainer(props) {
   //MUI classes
   const classes = useStyle();

   //get props
   const {
      image,
      openDialog = false,
      closeDialog,
      handleSubmit,
      handleSubmitFile,
      mediaType,
      mediaName,
   } = props;

   //states
   const [imageSrc, setImageSrc] = useState(null);
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [rotation, setRotation] = useState(0);
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const [croppedImage, setCroppedImage] = useState(null);
   const [cropping, setCropping] = useState(false);

   //add component dialog states
   const [addDialogOpen, setAddDialogOpen] = useState(false);

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   }, []);

   const showCroppedImage = useCallback(async () => {
      setCropping(true);
      try {
         const croppedImageInit = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            rotation,
            mediaType
         );
         setCroppedImage(croppedImageInit);
         var filename = function () {
            // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
            return '_' + Math.random().toString(36).substr(2, 9);
         };
         await urltoFile(
            croppedImageInit,
            filename() + mediaName,
            mediaType
         ).then((file) => handleSubmitFile(file));
         handleSubmit(croppedImageInit);
         setCropping(false);
         handleAddDialogClose();
      } catch (e) {
         setCropping(false);
         console.error(e);
      }
   }, [imageSrc, croppedAreaPixels, rotation]);

   //function
   const urltoFile = async (url, filename, mimeType) => {
      return fetch(url)
         .then(function (res) {
            return res.arrayBuffer();
         })
         .then(function (buf) {
            return new File([buf], filename, { type: mimeType });
         });
   };

   const imageFileSrc = async () => {
      const file = image;
      //   let imageDataUrl = await readFile(file);
      let imageDataUrl = URL.createObjectURL(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
         imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
   };
   //useEffect
   useEffect(() => {
      handleAddDialogOpen(openDialog);
      if (addDialogOpen || openDialog) {
         imageFileSrc();
      }
   }, [openDialog]);

   //functions
   const handleAddDialogClose = () => {
      setAddDialogOpen(false);
      closeDialog(false);
   };

   const handleAddDialogOpen = (open) => {
      setAddDialogOpen(open);
   };

   return (
      <div>
         {imageSrc && (
            <Dialog
               open={addDialogOpen}
               onClose={handleAddDialogClose}
               aria-labelledby="add-component-dialog"
               PaperProps={{
                  style: {
                     backgroundColor: '#eeeeee',
                     color: '#333333',
                     width: 500,
                  },
               }}
            >
               <DialogTitle id="add-component-dialog">
                  <Typography variant="h5">Add Component</Typography>
               </DialogTitle>
               <Divider />
               <DialogContent>
                  <div className={classes.cropContainer}>
                     <Cropper
                        image={imageSrc}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                     />
                  </div>
               </DialogContent>
               <DialogActions>
                  <Button onClick={handleAddDialogClose} color="inherit">
                     Cancel
                  </Button>
                  <Button
                     onClick={showCroppedImage}
                     color="primary"
                     disabled={cropping}
                  >
                     Crop
                     {cropping && (
                        <CircularProgress
                           size={20}
                           className={classes.customProgress}
                        />
                     )}
                  </Button>
               </DialogActions>
            </Dialog>
         )}
      </div>
   );
}

function readFile(file) {
   return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
   });
}
