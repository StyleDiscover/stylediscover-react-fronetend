import { Button, Container, Grid, Typography } from '@material-ui/core';
import { SpacedBox } from 'components/General/SpacedBox';
import { PROFILE, SIGNUP } from 'navigation/Constants';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginToLoadMoreInfluencer() {
   const history = useHistory();
   return (
      <div>
         <Container maxWidth="md" style={{ padding: 0 }}>
            <Typography variant="h5" align="center">
               Want to see more Influencers?
            </Typography>
            <SpacedBox />
            <Typography variant="h6" align="center">
               <b>LOGIN NOW!</b>
            </Typography>
            <SpacedBox />
            <Container maxWidth="xs" style={{ padding: 0 }}>
               <Grid container spacing={2}>
                  <Grid item xs={6} style={{ margin: 'auto' }}>
                     <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        disableElevation
                        style={{ padding: '10px 20px' }}
                        onClick={() => history.push(PROFILE)}
                     >
                        Login
                     </Button>
                  </Grid>
                  <Grid item xs={6} style={{ margin: 'auto' }}>
                     <Button
                        variant="outlined"
                        fullWidth
                        color="primary"
                        disableElevation
                        style={{ padding: '10px 20px' }}
                        onClick={() => history.push(SIGNUP)}
                     >
                        Sign-up
                     </Button>
                  </Grid>
               </Grid>
            </Container>
            <SpacedBox />
            <Typography variant="body2" align="center">
               <b>JOIN INDIA'S BIGGEST DISCOVERY PLATFROM</b>
            </Typography>
            <Typography variant="body2" align="center">
               Join StyleDiscover today!
            </Typography>
         </Container>
      </div>
   );
}
