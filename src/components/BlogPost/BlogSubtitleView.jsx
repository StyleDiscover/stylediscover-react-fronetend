import { Typography } from '@material-ui/core';
import React from 'react';

export default function BlogSubtitleView({ subtitle }) {
   return (
      <Typography
         variant="h3"
         style={{
            padding: '20px 20px 20px 0px',
         }}
      >
         {subtitle}
      </Typography>
   );
}
