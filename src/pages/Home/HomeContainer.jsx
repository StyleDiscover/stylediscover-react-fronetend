import { UserContext } from 'context/UserContext';
import React from 'react';
import HomeView from './HomeView';

export function HomeContainer() {
   const { user } = React.useContext(UserContext);
   return (
      <div>
         <HomeView isAuth={user.isAuthenticated} />
      </div>
   );
}
