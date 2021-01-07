import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

//import context
import { UserContext } from '../context/UserContext';

const AuthRoute = ({ component: Component, ...rest }) => {
   const { user } = useContext(UserContext);
   return (
      <Route
         {...rest}
         render={(props) =>
            localStorage.AccessToken ? (
               <Redirect to="/profile" />
            ) : (
               <Component {...props} />
            )
         }
      />
   );
};

export default AuthRoute;
