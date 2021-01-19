import React from 'react';
import { useHistory } from 'react-router-dom';

//MUI Imports
import { Container, Button } from '@material-ui/core';

//MUI icons
import { Add } from '@material-ui/icons';

import { CREATE } from 'navigation/Constants';

export function CreateButton() {
   //history
   const history = useHistory();

   return (
      <Container
         maxWidth="xs"
         style={{
            padding: '0px',
            margin: '20px auto',
            width: '100%',
         }}
      >
         <Button
            variant="contained"
            color="primary"
            style={{
               margin: 'auto',
               display: 'flex',
               padding: '10px 15px',
               boxShadow: 'none',
            }}
            startIcon={<Add />}
            onClick={() => history.push(CREATE)}
         >
            Create A Post
         </Button>
      </Container>
   );
}
