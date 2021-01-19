import React from 'react';

//MUI Imports
import { Typography } from '@material-ui/core';

export function MainPostCaptionView({ caption }) {
   return (
      <div style={{ padding: 10 }}>
         <Typography variant="body2">{caption}</Typography>
      </div>
   );
}
