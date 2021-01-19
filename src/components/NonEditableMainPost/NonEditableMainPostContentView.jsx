import React from 'react';

//MUI Imports
import { CardContent, Grid } from '@material-ui/core';

//component imports
import { NonEditableComponentPost } from 'components';

export default function NonEditableMainPostContentView({ mainPostData }) {
   return (
      <CardContent>
         <Grid container={true} spacing={2}>
            {mainPostData.component_posts.length > 0 &&
               mainPostData.component_posts.map((componentId) => {
                  return (
                     <Grid item xs={3} key={componentId}>
                        <NonEditableComponentPost
                           componentId={componentId}
                           mainPostId={mainPostData.id}
                           userId={mainPostData.user_id}
                           postUsername={mainPostData.username}
                        />
                     </Grid>
                  );
               })}
         </Grid>
      </CardContent>
   );
}
