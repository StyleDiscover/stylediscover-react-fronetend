import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, makeStyles, Link as MUILink } from '@material-ui/core';

import { ROOT } from 'navigation/Constants';

//use style
const useStyles = makeStyles({
   customFooter: {
      backgroundColor: 'rgba(255,255,255, 0.85)',
      width: '100%',
      bottom: 0,
      position: 'fixed',
      padding: 5,
      borderTop: '1px solid #aaa',
   },
});

export default function FixedFotterView() {
   const classes = useStyles();
   return (
      <div className={classes.customFooter}>
         <Typography align="center" variant="body2">
            Powered By{' '}
            <MUILink
               component={Link}
               to={ROOT}
               style={{ textDecoration: 'underline' }}
            >
               StyleDiscover
            </MUILink>
         </Typography>
      </div>
   );
}
