import React from 'react';

//MUI imports
import { Tooltip, withStyles } from '@material-ui/core';

export const DarkTooltip = withStyles(() => ({
   tooltip: {
      backgroundColor: '#333333',
      color: '#eeeeee',
      fontSize: 11,
   },
   arrow: {
      color: '#333333',
   },
}))(Tooltip);
