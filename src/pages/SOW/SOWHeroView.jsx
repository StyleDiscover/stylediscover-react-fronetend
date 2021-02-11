import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import HeroImage from 'assets/SOWHero.jpg';
import { SpacedBox } from 'components/General/SpacedBox';
import { ArrowForwardIos } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { SIGNUP } from 'navigation/Constants';

export default function SOWHeroView() {
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
         }}
      >
         <div>
            <Typography
               variant="h3"
               align="center"
               style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
               }}
            >
               A PAGE FOR SUPERORGANIZED WOMEN
            </Typography>
            <SpacedBox />
            <Typography
               variant="h5"
               align="center"
               style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 500,
               }}
            >
               TO SHOW OFF THEIR STYLE!
            </Typography>
            <SpacedBox />
            <Container maxWidth="xs">
               <Button
                  variant="outlined"
                  color="primary"
                  style={{
                     padding: '10px 20px',
                     margin: 'auto',
                     backgroundColor: 'rgba(238, 238, 238, 0.9)',
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
            <SpacedBox />
         </div>
      </div>
   );
}
