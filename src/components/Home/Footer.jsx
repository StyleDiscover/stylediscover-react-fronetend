import React from 'react';
import { Link } from 'react-router-dom';

//MUI imports
import {
   Typography,
   Divider,
   BottomNavigation,
   IconButton,
} from '@material-ui/core';

//MUI Icons
import { Facebook, Instagram } from '@material-ui/icons';

export default function Footer() {
   return (
      <div
         style={{
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            width: '100%',
         }}
      >
         <Divider />
         <div>
            <BottomNavigation
               style={{
                  display: 'block',
                  padding: 10,
               }}
            >
               <div
                  style={{
                     textAlign: 'center',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: 5,
                  }}
               >
                  <Typography variant="body2">
                     &copy; 2020 Bloombook Technology, Pvt. Ltd. All rights
                     reserved
                  </Typography>
               </div>

               <div
                  style={{
                     textAlign: 'center',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: 5,
                  }}
               >
                  <Typography
                     component={Link}
                     to="/policy/privacy"
                     style={{
                        textDecoration: 'none',
                     }}
                     color="primary"
                     variant="body2"
                  >
                     &nbsp; Privacy Policy
                  </Typography>
                  <Typography
                     component={Link}
                     to="/policy/termsandconditions"
                     style={{
                        textDecoration: 'none',
                     }}
                     color="primary"
                     variant="body2"
                  >
                     &nbsp; Terms & Conditions
                  </Typography>
               </div>
               <div
                  style={{
                     textAlign: 'center',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: 5,
                  }}
               >
                  <Typography
                     component={Link}
                     onClick={() => {
                        window.open('https://creators.stylediscover.in/');
                     }}
                     style={{
                        textDecoration: 'none',
                     }}
                     color="primary"
                     variant="body1"
                  >
                     &nbsp;<b> I am a creator</b>
                  </Typography>
               </div>

               <div
                  style={{
                     textAlign: 'center',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     padding: 5,
                  }}
               >
                  <IconButton size="small">
                     <Facebook
                        color="primary"
                        onClick={() => {
                           window.open(
                              'https://www.facebook.com/Style.Discover'
                           );
                        }}
                     />
                  </IconButton>
                  <IconButton size="small">
                     <Instagram
                        onClick={() => {
                           window.open(
                              'https://www.instagram.com/stylediscover_official/'
                           );
                        }}
                     />
                  </IconButton>
               </div>
            </BottomNavigation>
         </div>
      </div>
   );
}
