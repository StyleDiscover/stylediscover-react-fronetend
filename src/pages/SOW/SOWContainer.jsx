import { Container } from '@material-ui/core';
import React from 'react';
import SOWView from './SOWView';

export function SOWContainer() {
   return (
      <Container maxWidth="xl" style={{ padding: 0 }}>
         <SOWView />
      </Container>
   );
}
