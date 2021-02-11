import { Hidden } from '@material-ui/core';
import React from 'react';
import {
   NavigationAppBarMobile,
   NavigationBarDrawer,
   BottomNavigationSD,
} from '.';

export function NavigationBarContainer() {
   return (
      <div>
         {/* <Hidden only={['xs']}> */}
         <NavigationBarDrawer />
         {/* </Hidden>
         <Hidden smUp>
            <NavigationAppBarMobile />
            <BottomNavigationSD />
         </Hidden> */}
      </div>
   );
}
