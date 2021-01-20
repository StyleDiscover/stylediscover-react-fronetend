import React from 'react';

//MUI Imports
import { Grid } from '@material-ui/core';

//component imports
import { NonEditableComponentPost } from 'components';

export default function WishlistView({ wishlists }) {
   return (
      <Grid container={true} spacing={2}>
         {wishlists.wishlists.map((id) => {
            return (
               <Grid item={true} xs={4} md={3} lg={2} key={id}>
                  <NonEditableComponentPost componentId={id} />
               </Grid>
            );
         })}
      </Grid>
   );
}
