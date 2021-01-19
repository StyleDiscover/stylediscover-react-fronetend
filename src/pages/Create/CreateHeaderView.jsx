import React from 'react';

//MUI Imports
import { CardHeader, Typography } from '@material-ui/core';

export default function CreateHeaderView({ user }) {
   return (
      <CardHeader
         title={
            <div>
               {user.userData.account_type === 'PR' && (
                  <div>
                     <Typography variant="body1">
                        <b>Psst. We’ll tell you something really cool?</b>
                     </Typography>
                     <Typography variant="body2" style={{ marginTop: 5 }}>
                        You can also create your own StyleDiscover feed and show
                        off your personal style to the world!
                     </Typography>
                  </div>
               )}
               {user.userData.account_type === 'AD' && (
                  <div>
                     <Typography variant="body1">
                        <b>YOU'RE AN ADMIN... DUH :\</b>
                     </Typography>
                     <Typography variant="body2" style={{ marginTop: 5 }}>
                        Should have known better...
                     </Typography>
                  </div>
               )}
            </div>
         }
      />
   );
}
