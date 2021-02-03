import { CardContent, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
   customTitle: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      letterSpacing: 2,
   },
});

export default function BlogCardContent({ data }) {
   const classes = useStyles();
   return (
      <CardContent>
         <Typography
            variant="h5"
            component="h2"
            className={classes.customTitle}
         >
            {data.title.toUpperCase()}
         </Typography>
         <Typography variant="body1" component="p">
            {data.subtitle}
         </Typography>
      </CardContent>
   );
}
