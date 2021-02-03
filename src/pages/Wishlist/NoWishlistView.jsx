import React from 'react';
import { Link } from 'react-router-dom';

//MUI imports
import { Link as MUILink, Typography } from '@material-ui/core';

//navigation imports
import { EXPLORE } from 'navigation/Constants';

export default function NoWishlistView() {
   return (
      <div>
         <Typography
            style={{
               fontFamily: 'Roboto, sans-serif',
               fontWeight: '400',
               textAlign: 'center',
            }}
            variant="body2"
         >
            You do not have any products in your wishlist.
         </Typography>
         <br />
         <Typography
            style={{
               fontFamily: 'Roboto, sans-serif',
               fontWeight: '400',
               textAlign: 'center',
            }}
            variant="body1"
         >
            <MUILink component={Link} to={EXPLORE}>
               <b>Explore</b>
            </MUILink>{' '}
            Now to start wishlisting.
         </Typography>
      </div>
   );
}
