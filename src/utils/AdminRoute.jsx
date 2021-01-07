import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

//import context
import { UserContext } from '../context/UserContext';

const AdminRoute = ({ component: Component, ...rest }) => {
   const { user } = useContext(UserContext);
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

export default AdminRoute;
