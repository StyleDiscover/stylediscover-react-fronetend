import React from 'react';

//MUI Imports
import { TextField } from '@material-ui/core';

export default function CaptionFieldView({ caption, handleCaptionChange }) {
   return (
      <form>
         <TextField
            variant="outlined"
            id="caption"
            name="caption"
            size="small"
            fullWidth={true}
            label="Caption"
            multiline={true}
            rows="3"
            rowsMax="5"
            style={{
               marginTop: 10,
               marginBottom: 10,
            }}
            onChange={handleCaptionChange}
            value={caption}
         />
      </form>
   );
}
