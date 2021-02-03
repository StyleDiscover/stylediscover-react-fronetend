import { Typography } from '@material-ui/core';
import React from 'react';

export default function BlogBodyView({ body }) {
   return (
      <Typography
         variant="body1"
         style={{
            fontFamily: 'Montserrat',
            fontSize: '1.2em',
         }}
      >
         {body}
      </Typography>
   );
}
