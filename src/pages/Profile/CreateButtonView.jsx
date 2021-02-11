import React from 'react';

//lazy loading
import { loadable } from 'react-lazily/loadable';
//MUI
import { Grid } from '@material-ui/core';

import { CREATE } from 'navigation/Constants';

const { CreateButton } = loadable(() => import('components'));

export default function CreateButtonView() {
   return (
      <Grid container spacing={1} style={{ marginTop: 20, marginBottom: 20 }}>
         <Grid item xs={12}>
            <CreateButton
               text="Create A Post"
               destination={CREATE}
               position="center"
               vposition="top"
            />
         </Grid>
         {/* <Grid item xs={12} sm={6}>
            <Hidden only="xs">
               <CreateButton
                  text="Create A Blog"
                  destination={CREATE_BLOG}
                  position="left"
                  vposition="top"
               />
            </Hidden>
            <Hidden smUp>
               <CreateButton
                  text="Create A Blog"
                  destination={CREATE_BLOG}
                  position="center"
                  vposition="top"
               />
            </Hidden>
         </Grid> */}
      </Grid>
   );
}
