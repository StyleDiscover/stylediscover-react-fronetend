import React from 'react';

//use history
import { useHistory } from 'react-router-dom';

//MUI imports
import { IconButton, Container } from '@material-ui/core';

//MUI Icons Import
import { ArrowBack } from '@material-ui/icons';

export function GoBackButtonView() {
   //history
   const history = useHistory();
   return (
      <Container maxWidth="lg" style={{ marginBottom: 10 }}>
         <IconButton onClick={() => history.goBack()}>
            <ArrowBack />
         </IconButton>
      </Container>
   );
}
