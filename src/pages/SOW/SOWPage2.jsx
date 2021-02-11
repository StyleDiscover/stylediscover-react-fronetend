import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import HeroImage from 'assets/SOWP2.jpg';
import { SpacedBox } from 'components/General/SpacedBox';
import { Face, Home, ViewQuilt } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

export default function SOWPage2() {
   const history = useHistory();
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: `url(${HeroImage}) no-repeat bottom center fixed`,
            backgroundSize: 'cover',
            boxShadow: 'inset 0 0 0 2000px rgba(238, 238, 238, 0)',
         }}
      >
         <Container maxWidth="md">
            <Typography
               variant="h4"
               align="center"
               style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  letterSpacing: 2,
               }}
            >
               HERE ARE SOME DEMOS
            </Typography>
            <SpacedBox />
            <Typography
               variant="body2"
               align="center"
               style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
               }}
            >
               For you to see how will your page look like.
            </Typography>
            <SpacedBox />
            <Container maxWidth="lg">
               <Grid container spacing={3}>
                  {[
                     {
                        text: 'organised closet',
                        icon: <ViewQuilt style={{ fontSize: 50 }} />,
                        to: '/urmidaga',
                     },
                     {
                        text: 'organised Homes',
                        icon: <Home style={{ fontSize: 50 }} />,
                        to: '/snrao',
                     },
                     {
                        text: 'organised skin regimen',
                        icon: <Face style={{ fontSize: 50 }} />,
                        to: '/jadapinkettsmith/mentions',
                     },
                  ].map((buttonGrid) => (
                     <Grid item xs={12} md={4}>
                        <Button
                           variant="outlined"
                           color="primary"
                           style={{
                              padding: '10px 20px',
                              margin: 'auto',
                              backgroundColor: 'rgba(238, 238, 238, 0.8)',
                              border: '1.5px solid #333',
                              //    borderRadius: '50%',
                              marginTop: 15,
                              height: '100%',
                           }}
                           fullWidth
                           onClick={() => history.push(buttonGrid.to)}
                        >
                           <Typography
                              style={{
                                 fontFamily: 'Montserrat',
                                 fontWeight: 700,
                                 letterSpacing: 2,
                              }}
                              variant="h6"
                           >
                              {buttonGrid.icon}
                              <br />
                              {buttonGrid.text}
                           </Typography>
                        </Button>
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </Container>
      </div>
   );
}
