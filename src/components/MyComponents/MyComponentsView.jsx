import React from 'react';

//MUI Imports
import {
   makeStyles,
   FormControl,
   InputLabel,
   Select,
   Grid,
   Typography,
} from '@material-ui/core';

import { SelectableComponentPost } from 'components';

//MUI Make Styles
const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
      padding: 10,
   },
});

export default function MyComponentsView({
   selectedComponent,
   myComponentData,
   handleSelect,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div>
         <Grid container spacing={2} style={{ padding: '0px' }}>
            {selectedComponent.map(
               (component, index) =>
                  myComponentData.addComponents.includes(component) && (
                     <Grid item xs={4} sm={3} key={index}>
                        <div onClick={handleSelect(component)}>
                           <SelectableComponentPost componentId={component} />
                        </div>
                     </Grid>
                  )
            )}
         </Grid>
         <br />
         <FormControl fullWidth variant="outlined">
            <InputLabel id="mycomponents-label">My Components</InputLabel>
            <Select
               labelId="mycomponents-label"
               id="mycomponents"
               label="My Components"
               onChange={(event) => event.preventDefault()}
            >
               <Grid
                  container
                  spacing={2}
                  style={{ padding: '0px 10px', maxHeight: 250 }}
               >
                  {myComponentData.myCollection.map((component, index) => (
                     <Grid item xs={4} sm={3} key={index}>
                        <div onClick={handleSelect(component)}>
                           <SelectableComponentPost componentId={component} />
                        </div>
                     </Grid>
                  ))}
                  {myComponentData.myCollection.length === 0 && (
                     <Typography
                        className={classes.customNoPostMessage}
                        variant="body2"
                     >
                        No Product In Collection.
                     </Typography>
                  )}
               </Grid>
            </Select>
         </FormControl>
      </div>
   );
}
