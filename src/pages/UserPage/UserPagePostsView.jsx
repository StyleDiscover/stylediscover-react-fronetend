import React from 'react';

//MUI imports
import { Grid } from '@material-ui/core';

//component imports
import { NonEditableMainPost } from 'components';

export default function UserPagePostsView({ userData }) {
   return (
      <Grid container={true} spacing={2}>
         {userData.main_posts.map((id) => {
            return (
               <Grid item={true} xs={12} sm={6} lg={4}>
                  <NonEditableMainPost id={id} />
               </Grid>
            );
         })}
      </Grid>
   );
}
