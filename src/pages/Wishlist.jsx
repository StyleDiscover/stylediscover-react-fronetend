//react imports
import React, { useContext } from 'react';

//context and events
import { WishlistContext } from '../context/WishlistContext';
import { UserContext } from '../context/UserContext';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   Grid,
   Avatar,
   Link as MUILink,
   makeStyles,
} from '@material-ui/core';

//MUI Icons imports
import { Add } from '@material-ui/icons';

//components
import WishlistComponent from '../components/Wishlist/WishlistComponent';
import NonEditableComponentPost from '../components/ComponentPost/NonEditableComponentPost';

//MUI Make Styles
const useStyles = makeStyles({
   customUsername: {
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customPaper: {
      paddingTop: 20,
      color: '#333333',
      margin: '20px 0px',
   },
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
   customCreateButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
   },
   customTitle: {
      marginBottom: 20,
      textAlign: 'center',
   },
});

export default function Wishlist() {
   //use styles
   const classes = useStyles();

   //use context
   const { wishlists } = useContext(WishlistContext);
   const { user } = useContext(UserContext);

   return (
      <Container maxWidth="lg" className="margin-top-80">
         <div>
            {/* WISHLIST TITLE STARTS*/}
            <Typography variant="h5" className={classes.customTitle}>
               Wishlist of{' '}
               {user.userData.name !== ''
                  ? user.userData.name
                  : user.userData.username}
            </Typography>
            {/* WISHLIST TITLE ENDS */}

            {/* USER WISHLISTS STARTS */}
            {wishlists.wishlists.length === 0 && (
               <Typography
                  className={classes.customNoPostMessage}
                  variant="body2"
               >
                  No Wishlists
               </Typography>
            )}
            <Grid container={true} spacing={2}>
               {wishlists.wishlists.map((id) => {
                  return (
                     <Grid item={true} xs={4} md={3} lg={2} key={id}>
                        <NonEditableComponentPost componentId={id} />
                     </Grid>
                  );
               })}
            </Grid>
            {/* USER WISHLISTS ENDS */}
         </div>
      </Container>
   );
}
