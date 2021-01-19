import React from 'react';

//MUI Imports
import { Container, Paper, makeStyles, Typography } from '@material-ui/core';

//use style
const useStyle = makeStyles({
   mainPaper: {
      padding: 20,
   },
});

export default function AnalyticsSummaryError() {
   //useStyle
   const classes = useStyle();
   return (
      <Container maxWidth="lg">
         <Paper className={classes.mainPaper}>
            <Typography variant="body1" align="center">
               An error occured while getting your data :( <br /> please try
               again later.
            </Typography>
         </Paper>
      </Container>
   );
}
