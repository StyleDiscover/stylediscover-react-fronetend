import React from 'react';

//MUI Imports
import { CardContent, Grid } from '@material-ui/core';

//component imports
import { EditableComponentPost } from 'components';

export default function ContentView({ mainPostData, id }) {
   return (
      <CardContent>
         <Grid container={true} spacing={2}>
            {mainPostData.component_posts.length > 0 &&
               mainPostData.component_posts.slice(0, 8).map((componentId) => {
                  return (
                     <Grid item xs={3} key={componentId}>
                        <EditableComponentPost
                           componentId={componentId}
                           mainPostId={id}
                           mainPostComponentList={mainPostData.component_posts}
                           userId={mainPostData.user_id}
                        />
                     </Grid>
                  );
               })}
         </Grid>
      </CardContent>
   );
}
