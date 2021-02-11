//react imports
import React, { useState, useContext } from 'react';

//context and events
import { UserContext } from 'context/UserContext';
import { MyComponentsContext } from 'context/MyComponentContext';
import { WishlistContext } from 'context/WishlistContext';
import { logout } from 'events/UserEvents';

import NavigationBarDrawerView from './NavigationBarDrawerView';

export function NavigationBarDrawerContainer(props) {
   // get user dispatch
   const { user, userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);
   const { componentDispatch } = useContext(MyComponentsContext);

   //states
   const [drawer, setDrawer] = useState(false);

   //logout function
   const handleLogout = (event) => {
      const token = localStorage.AccessToken;
      logout(token, userDispatch, componentDispatch, wishlistDispatch);
   };

   //drawer toggle
   const toggleDrawer = (open) => (event) => {
      if (
         event &&
         event.type === 'keydown' &&
         (event.key === 'Tab' || event.key === 'Shift')
      ) {
         return;
      }
      setDrawer(open);
   };

   return (
      <NavigationBarDrawerView
         props={props}
         toggleDrawer={toggleDrawer}
         drawer={drawer}
         user={user}
         handleLogout={handleLogout}
      />
   );
}
