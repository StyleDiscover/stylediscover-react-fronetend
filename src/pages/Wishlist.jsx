//react imports
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

//crypto imports
import AES from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

//slider image
import sheenaImg from '../assets/slider/1.png';
import limitlessImg from '../assets/slider/2.png';
import urmiImg from '../assets/slider/3.png';
import chairImg from '../assets/slider/4.png';
import discoverherstyleImg from '../assets/slider/5.jpeg';

//components
import WishlistComponent from '../components/Wishlist/WishlistComponent';
import NonEditableComponentPost from '../components/ComponentPost/NonEditableComponentPost';
import ImageSlider from '../components/Static/ImageSlider';

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
      color: '#eeeeee',
   },
   customTitle: {
      marginBottom: 20,
      textAlign: 'center',
   },
});

export default function Wishlist(props) {
   //use styles
   const classes = useStyles();

   //state
   const [postUsername, setPostUsername] = useState(null);

   //use context
   const { wishlists } = useContext(WishlistContext);
   const { user } = useContext(UserContext);

   //history
   const { history } = props;

   //use effect
   //get wishlist
   useEffect(() => {
      const url_string = window.location.href;
      const url = new URL(url_string);
      if (url.searchParams.get('username')) {
         const postUsernameEncrypted = url.searchParams
            .get('username')
            .toString()
            .replace(/ /g, '+')
            .replace(/\*/g, '/');
         const postUsername = AES.decrypt(
            postUsernameEncrypted,
            'DatLp5Rm7RnHe8kk3KbY'
         ).toString(enc);
         setPostUsername(postUsername);
      }
   }, []);

   return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
         <Container maxWidth="lg" className="margin-top-80">
            {/* WISHLIST TITLE STARTS*/}
            <Typography variant="h5" className={classes.customTitle}>
               {/* Wishlist of{' '}
               {user.userData.name !== ''
                  ? user.userData.name
                  : user.userData.username} */}
               Your Wishlist
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

            {/* GO BACK STARTS */}

            {postUsername && (
               <Grid container={true} style={{ marginTop: 50 }}>
                  <Grid item={true} xs={12} style={{ margin: 'auto' }}>
                     <Container
                        maxWidth="xs"
                        style={{
                           padding: '0px',
                           margin: '20px auto',
                           width: '100%',
                        }}
                     >
                        <Button
                           variant="contained"
                           color="primary"
                           className={classes.customCreateButton}
                           onClick={() => history.push(`/${postUsername}`)}
                        >
                           <Typography variant="body2">
                              Go Back To {postUsername}
                           </Typography>
                        </Button>
                     </Container>
                  </Grid>
               </Grid>
            )}
            {/* <Typography variant="body1" color="primary">
                     <b>Go Back</b>
                  </Typography> */}

            {/* GO BACK ENDS*/}
         </Container>
         <div
            style={{
               paddingBottom: 125,
            }}
         ></div>
         <div className={classes.containerMargin}>
            <ImageSlider
               data={[
                  {
                     imageUrls: sheenaImg,
                     name: '@sheenasherwani',
                     sliderUrl: '/sheenasherwani',
                  },
                  {
                     imageUrls: chairImg,
                     name: '@thestylechair',
                     sliderUrl: '/thestylechair',
                  },
                  {
                     imageUrls: limitlessImg,
                     name: '@limitless_adventurer',
                     sliderUrl: '/limitless_adventurer',
                  },
                  {
                     imageUrls: urmiImg,
                     name: '@urmidaga',
                     sliderUrl: '/urmidaga',
                  },
                  {
                     imageUrls: discoverherstyleImg,
                     name: '@discoverherstyle',
                     sliderUrl: '/discoverherstyle',
                  },
               ]}
               title={
                  <>
                     <Typography variant="h4" className={classes.monFont}>
                        LOOKING FOR MORE COOL STUFF?
                     </Typography>
                     <Typography
                        variant="h6"
                        className={classes.monFont}
                        style={{ marginTop: 10 }}
                     >
                        Check out the latest styles by our top influencers
                     </Typography>
                  </>
               }
               exploreMore={true}
            />
         </div>
      </div>
   );
}
