import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
   coverImage: {
      maxWidth: 750,
      width: '100%',
   },
});

export default function BlogCoverView({ image, title }) {
   const classes = useStyles();
   return <img src={image} className={classes.coverImage} alt={title} />;
}
