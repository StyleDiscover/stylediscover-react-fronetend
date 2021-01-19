import React from 'react';

//Mui imports
import { makeStyles, Button, CircularProgress } from '@material-ui/core';

//MUI icons import
import { Facebook } from '@material-ui/icons';

//facebook API
import FacebookLoginBtn from 'react-facebook-login/dist/facebook-login-render-props';

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

export default function FacebookLoginView({ responseFacebook, user }) {
   //usestyles
   const classes = useStyle();

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
