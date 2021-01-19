import React from 'react';

//MUI imports
import { Container, Paper, Typography, makeStyles } from '@material-ui/core';

//use style
const useStyle = makeStyles({
   mainPaper: {
      padding: 20,
   },
});

export default function AnalyticsUnauthView() {
   //usestyles
   const classes = useStyle();

   return (
      <Container maxWidth="lg">
         <Paper className={classes.mainPaper}>
            <Typography variant="body1" align="center">
               You are not authorized to access this page.
            </Typography>
         </Paper>
      </Container>
   );
}
