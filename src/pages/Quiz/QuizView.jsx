import { Container } from '@material-ui/core';
import { SpacedBox } from 'components/General/SpacedBox';
import React from 'react';

export default function QuizView({ url }) {
   return (
      <Container maxWidth="md" style={{ overflow: 'hidden' }}>
         <SpacedBox />
         <iframe
            title="gform"
            src={url}
            style={{
               width: '100%',
               border: '0px',
               height: '100vh',
               overflow: 'hidden',
            }}
         />
         <SpacedBox />
      </Container>
   );
}
