import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI Imports
import { Container, Button } from '@material-ui/core';

//MUI icons
import { Add } from '@material-ui/icons';

export function CreateButton({ text, destination, position, vposition }) {
   //history
   const history = useHistory();

   return (
      <Container
         maxWidth="xs"
         style={{
            padding: '0px',
            margin: 'auto',
            width: '100%',
         }}
      >
         <Button
            variant="contained"
            color="primary"
            style={{
               margin:
                  position === 'center'
                     ? 'auto'
                     : position === 'right'
                     ? '0px 0px 0px auto'
                     : '0px',
               display: 'flex',
               padding: '10px 15px',
               boxShadow: 'none',
            }}
            startIcon={<Add />}
            onClick={() => history.push(destination)}
         >
            {text}
         </Button>
      </Container>
   );
}
