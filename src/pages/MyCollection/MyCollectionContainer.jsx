//react imports
import React, { useContext } from 'react';

//context and events
import { UserContext } from 'context/UserContext';
import { MyComponentsContext } from 'context/MyComponentContext';

//MUI Imports
import { Typography, Container, Grid, makeStyles } from '@material-ui/core';

//components
import { NonEditableComponentPost } from 'components';
import MyCollectionTitleView from './MyCollectionTitleView';
import MyCollectionNoComponentView from './MyCollectionNoComponentView';

//Views imports

//MUI Make Styles
const useStyles = makeStyles({
   customTitle: {
      marginBottom: 20,
      textAlign: 'center',
   },
});

export function MyCollectionContainer() {
   //use styles
   const classes = useStyles();

   //use context
   const { user } = useContext(UserContext);
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );
   return (
      <Container maxWidth="lg" className="margin-top-80">
         {
            <div>
               {/* WISHLIST TITLE STARTS*/}
               <Typography variant="h5" className={classes.customTitle}>
                  Collection of{' '}
                  {user.userData.name !== ''
                     ? user.userData.name
                     : user.userData.username}
               </Typography>
               <MyCollectionTitleView />
               {/* WISHLIST TITLE ENDS */}

               {/* USER WISHLISTS STARTS */}
               {myComponentData.myCollection.length === 0 && (
                  <MyCollectionNoComponentView />
               )}
               <Grid container={true} spacing={2}>
                  {myComponentData.myCollection.map((component, index) => (
                     <Grid item={true} xs={4} md={3} lg={2} key={index}>
                        <NonEditableComponentPost componentId={component} />
                     </Grid>
                  ))}
               </Grid>
               {/* USER WISHLISTS ENDS */}
            </div>
         }
      </Container>
   );
}
