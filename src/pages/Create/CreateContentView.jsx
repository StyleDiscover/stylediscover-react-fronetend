import React from 'react';

//MUI Imports
import {
   Grid,
   CardContent,
   Paper,
   makeStyles,
   Typography,
} from '@material-ui/core';

//MUI Icons
import { Add } from '@material-ui/icons';

//import components
import { NonEditableComponentPost } from 'components';

//use styles
const useStyle = makeStyles({
   paperImgStyle: {
      paddingTop: '50%',
      paddingBottom: '50%',
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   customCreateButton: {
      fontSize: 50,
      color: '#aaa',
      position: 'absolute',
   },
});

export default function CreateContentView({
   componentList,
   media,
   handleAddDialogOpen,
}) {
   //use style
   const classes = useStyle();
   return (
      <CardContent>
         <Grid container spacing={2}>
            {componentList.length > 0 &&
               componentList.map((componentId) => {
                  return (
                     <Grid item xs={3} key={componentId}>
                        <NonEditableComponentPost componentId={componentId} />
                     </Grid>
                  );
               })}
            {componentList.length < 8 && (
               <Grid item xs={3}>
                  <Paper
                     className={classes.paperImgStyle}
                     variant="outlined"
                     onClick={handleAddDialogOpen}
                     square={true}
                  >
                     <Add className={classes.customCreateButton} />
                  </Paper>
               </Grid>
            )}
         </Grid>
      </CardContent>
   );
}
