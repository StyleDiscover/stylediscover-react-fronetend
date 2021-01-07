import React, { createContext, useReducer } from 'react';
import { wishlistReducer } from '../reducers/WishlistReducer';

export const WishlistContext = createContext();

const WishlistContextProvider = (props) => {
   const [wishlists, wishlistDispatch] = useReducer(wishlistReducer, {
      loading: false,
      wishlists: [],
      errorData: {},
   });

   return (
      <WishlistContext.Provider value={{ wishlists, wishlistDispatch }}>
         {props.children}
      </WishlistContext.Provider>
   );
};

export default WishlistContextProvider;
