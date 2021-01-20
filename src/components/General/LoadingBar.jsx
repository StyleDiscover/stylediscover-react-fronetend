import React from 'react';

//MUI imports
import { Container, LinearProgress, Typography } from '@material-ui/core';

export function LoadingBar() {
   return (
      <Container maxWidth="md">
         <Typography variant="h5">Loading...</Typography>
         <br />
         <LinearProgress />
      </Container>
   );
}
