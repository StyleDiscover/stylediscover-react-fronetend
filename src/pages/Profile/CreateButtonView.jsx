import React from 'react';

//lazy loading
import { loadable } from 'react-lazily/loadable';
//MUI
import { Grid, Hidden } from '@material-ui/core';

import { CREATE, CREATE_BLOG } from 'navigation/Constants';

const { CreateButton } = loadable(() => import('components'));

export default function CreateButtonView() {
   return (
      <Grid container spacing={1} style={{ marginTop: 20, marginBottom: 20 }}>
         <Grid item xs={12} sm={6}>
            <Hidden only="xs">
               <CreateButton
                  text="Create A Post"
                  destination={CREATE}
                  position="right"
                  vposition="top"
               />
            </Hidden>
            <Hidden smUp>
               <CreateButton
                  text="Create A Post"
                  destination={CREATE}
                  position="center"
                  vposition="top"
               />
            </Hidden>
         </Grid>
         <Grid item xs={12} sm={6}>
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
         </Grid>
      </Grid>
   );
}
