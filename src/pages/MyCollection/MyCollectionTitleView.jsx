import React from 'react';

//MUI imports
import { Typography } from '@material-ui/core';

export default function MyCollectionTitleView() {
   return (
      <div>
         <Typography variant="h6" align="center" style={{ marginBottom: 25 }}>
            This is a collection of all the products for which you’ve added
            shopping links on your StyleDiscover page.
         </Typography>
      </div>
   );
}
