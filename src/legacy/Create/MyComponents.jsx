//react imports
import React, { useState, useEffect, useContext } from 'react';

//context and events imports
import { MainPostContext } from '../../context/MainPostContext';
import { UserContext } from '../../context/UserContext';
import { MyComponentsContext } from '../../context/MyComponentContext';

//MUI Imports
import {
   Paper,
   CardMedia,
   makeStyles,
   Typography,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Grid,
} from '@material-ui/core';
import SelectableComponentPost from './SelectableComponentPost';

//style MUI
const useStyle = makeStyles({
   imgStyles: {
      height: 0,
      paddingTop: '100%',
      cursor: 'pointer',
      position: 'relative',
   },
   ComponentImageRoot: {
      backgroundPosition: 'top',
   },
   custonFavButton: {
      margin: 0,
      bottom: 3,
      left: 3,
      position: 'absolute',
      background: '#eee',
   },
   customSize: {
      height: 20,
      width: 20,
   },
   custionButtonRoot: {
      minHeight: 0,
   },
   dialogPaper: {
      width: 250,
   },
   customBuyButton: {
      width: 250,
      marginTop: 10,
   },
   customFavButton: {
      width: 250,
      marginTop: 10,
   },
   customDialogContent: {
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   dialogImgStyles: {
      height: 0,
      paddingTop: '100%',
   },
});

export default function MyComponents() {
   //MUI style classes
   const classes = useStyle();

   //   use state
   const [selectedComponent, setSelectedComponent] = useState([]);

   //use context
   const { mainPostDispatch } = useContext(MainPostContext);
   const { user } = useContext(UserContext);
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

   //funtion

   const handleSelect = (component) => (event) => {
      event.preventDefault();
      if (!myComponentData.addComponents.includes(component)) {
         componentDispatch({
            type: 'ADD_COMPONENT',
            id: [component],
         });
         setSelectedComponent([...selectedComponent, component]);
      }
   };
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
         <FormControl
            className={classes.formControl}
            fullWidth
            variant="outlined"
         >
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
               </Grid>
            </Select>
         </FormControl>
      </div>
   );
}
