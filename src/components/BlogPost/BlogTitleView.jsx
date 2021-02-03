import { Typography } from '@material-ui/core';
import React from 'react';

export default function BlogTitleView({ title }) {
   return (
      <Typography
         variant="h2"
         style={{
            padding: '0px 20px 20px 0px',
            letterSpacing: 2,
            fontFamily: 'Montserrat',
            fontWeight: 500,
         }}
      >
         {title}
      </Typography>
   );
}
