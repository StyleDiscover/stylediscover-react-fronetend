//react imports
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

//facebook API
import FacebookLoginBtn from 'react-facebook-login/dist/facebook-login-render-props';

//import context and event
import { UserContext } from '../../context/UserContext';
import { WishlistContext } from '../../context/WishlistContext';
import { loginWithFacebook } from '../../events/UserEvents';

//Mui imports
import { makeStyles, Button, CircularProgress } from '@material-ui/core';

//MUI icons import
import { Facebook } from '@material-ui/icons';

//makestyles
const useStyle = makeStyles({
   custonFBButton: {
      paddingLeft: 10,
   },
   custonFBIcon: {
      marginRight: 10,
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function FacebookLogin({ wishlistId, postId, postUsername }) {
   //MUI classes
   const classes = useStyle();

   //use context
   const { user, userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);

   //history
   const history = useHistory();

   //funcitons
   const responseFacebook = (response) => {
      const facebookData = {
         access_token: response.accessToken,
      };
      loginWithFacebook(
         facebookData,
         userDispatch,
         postId,
         wishlistId,
         wishlistDispatch,
         postUsername,
         history
      );
   };

   return (
      <div>
         <FacebookLoginBtn
            appId="2825170594393592"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
               <Button
                  onClick={renderProps.onClick}
                  type="submit"
                  color="primary"
                  variant="contained"
                  disableElevation
                  className={classes.custonFBButton}
                  disabled={user.loading}
               >
                  <Facebook className={classes.custonFBIcon}></Facebook>
                  Facebook Login
                  {user.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            )}
         ></FacebookLoginBtn>
      </div>
   );
}
