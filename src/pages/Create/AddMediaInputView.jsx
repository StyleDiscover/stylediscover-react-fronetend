import React from 'react';

//MUI Imports
import { Typography, makeStyles } from '@material-ui/core';

//MUI Icons
import { Add } from '@material-ui/icons';

//use styles
const useStyle = makeStyles({
   paperImgStyle: {
      paddingTop: '50%',
      paddingBottom: '50%',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   customCreateButton: {
      fontSize: 50,
      color: '#aaa',
      position: 'absolute',
   },
   customMainImageInput: {
      display: 'None',
   },
});

export default function AddMediaInputView({ addMainPicture }) {
   // use style
   const classes = useStyle();

   return (
      <label className={classes.paperImgStyle} htmlFor="icon-button-file">
         <input
            accept="image/*,video/*"
            className={classes.customMainImageInput}
            id="icon-button-file"
            type="file"
            onChange={addMainPicture}
         />
         <div className={classes.customCreateButton}>
            <Add style={{ fontSize: '40' }} />
            <Typography
               variant="body2"
               style={{
                  color: '#aaa',
               }}
            >
               Add Media
            </Typography>
         </div>
      </label>
   );
}
