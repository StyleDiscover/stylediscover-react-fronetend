import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnAuthRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) =>
            !localStorage.AccessToken ? (
               <Redirect to="/login" />
            ) : (
               <Component {...props} />
            )
         }
      />
   );
};

export default UnAuthRoute;
