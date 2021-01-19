import React from 'react';

//MUI Imports
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

//use styles
const useStyle = makeStyles({
   customProgress: {
      marginLeft: 10,
   },
   customPublishButton: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
   },
});

export default function PublishButtonView({
   handlePublish,
   canPublish,
   mainPosts,
}) {
   //use style
   const classes = useStyle();
   return (
      <Button
         variant="contained"
         color="primary"
         className={classes.customPublishButton}
         fullWidth={true}
         onClick={handlePublish}
         disableElevation={true}
         disabled={!canPublish || mainPosts.loading}
      >
         Publish
         {mainPosts.loading && (
            <CircularProgress size={20} className={classes.customProgress} />
         )}
      </Button>
   );
}
