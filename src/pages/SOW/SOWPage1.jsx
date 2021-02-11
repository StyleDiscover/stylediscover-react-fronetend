import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import HeroImage from 'assets/SOWP1.jpg';
import { SpacedBox } from 'components/General/SpacedBox';
import { ArrowForwardIos } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { SIGNUP } from 'navigation/Constants';

export default function SOWPage1() {
   const history = useHistory();
   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: `url(${HeroImage}) no-repeat center center fixed`,
            backgroundSize: 'cover',
            boxShadow: 'inset 0 0 0 2000px rgba(238, 238, 238, 0.5)',
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
               INSPIRE OTHER WOMEN THROUGH YOUR STYLE AND YOUR THOUGHTFUL
               PURCHASES
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
               Create a Stylediscover page today and share it with whoever asks
               you for your recommendations, your Facebook groups etc.
            </Typography>
            <SpacedBox />
            <Container maxWidth="xs">
               <Button
                  variant="outlined"
                  color="primary"
                  style={{
                     padding: '10px 20px',
                     margin: 'auto',
                     backgroundColor: 'rgba(238, 238, 238, 0.8)',
                     border: '1.5px solid #333',
                     borderRadius: 15,
                     marginTop: 15,
                  }}
                  fullWidth
                  endIcon={<ArrowForwardIos />}
                  onClick={() => history.push(SIGNUP)}
               >
                  <Typography
                     style={{
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        letterSpacing: 2,
                     }}
                     variant="h6"
                  >
                     Start my page
                  </Typography>
               </Button>
            </Container>
         </Container>
      </div>
   );
}
