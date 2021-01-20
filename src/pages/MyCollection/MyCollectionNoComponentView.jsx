import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, makeStyles, Link as MUILink } from '@material-ui/core';

import { CREATE } from 'navigation/Constants';

const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
   customNoPostCreateMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
});

export default function MyCollectionNoComponentView() {
   const classes = useStyles();
   return (
      <div>
         <Typography className={classes.customNoPostMessage} variant="body2">
            No Product In Collection.
         </Typography>
         <br />
         <Typography
            className={classes.customNoPostCreateMessage}
            variant="body1"
         >
            Start adding pictures in the{' '}
            <MUILink component={Link} to={CREATE}>
               <b>Create</b>
            </MUILink>{' '}
            section to get started.
         </Typography>
      </div>
   );
}
