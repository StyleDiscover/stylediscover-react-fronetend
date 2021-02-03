import React from 'react';

import { Typography, Container } from '@material-ui/core';

export default function ClickImageToView() {
   return (
      <Container maxWidth="sm">
         <Typography
            style={{
               color: '#999',
               marginBottom: 25,
            }}
            align="center"
            variant="body2"
         >
            Tap the picture to shop the post
         </Typography>
      </Container>
   );
}
