import React from 'react';

//MUI imports
import {
   Grid,
   Container,
   Button,
   makeStyles,
   Typography,
} from '@material-ui/core';

//use styles
const useStyles = makeStyles({
   customCreateButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
      color: '#eeeeee',
   },
});

export default function WishlistGoBackToUserView({ postUsername, history }) {
   //use styles
   const classes = useStyles();
   return (
      <Grid container={true} style={{ marginTop: 50 }}>
         <Grid item={true} xs={12} style={{ margin: 'auto' }}>
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
                  className={classes.customCreateButton}
                  onClick={() => history.push(`/${postUsername}`)}
               >
                  <Typography variant="body2">
                     Go Back To {postUsername}
                  </Typography>
               </Button>
            </Container>
         </Grid>
      </Grid>
   );
}
