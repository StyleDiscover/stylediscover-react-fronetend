import React from 'react';

//MUI Imports
import {
   Card,
   CardHeader,
   CardContent,
   Typography,
   makeStyles,
   Divider,
} from '@material-ui/core';

//use style
const useStyle = makeStyles({
   mainPaper: {
      padding: 20,
   },
});

export function MetricsCard({ title, data, unit }) {
   //use styles
   const classes = useStyle();

   return (
      <div>
         <Card elevation={5} style={{ borderRadius: 10 }}>
            <CardHeader
               title={<Typography style={{ fontSize: 20 }}>{title}</Typography>}
            ></CardHeader>
            <Divider />
            <CardContent>
               <Typography variant="h6">
                  {data ? data : '0'}
                  <Typography style={{ float: 'right', fontSize: 20 }}>
                     {unit ? unit : ''}
                  </Typography>
               </Typography>
            </CardContent>
         </Card>
      </div>
   );
}
