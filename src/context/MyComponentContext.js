import React, { createContext, useReducer } from 'react';
import { myComponentReducer } from '../reducers/MyComponentReducer';

export const MyComponentsContext = createContext();

const MyComponentsContextProvider = (props) => {
   const [myComponentData, componentDispatch] = useReducer(myComponentReducer, {
      loading: false,
      addComponents: [],
      myCollection: [],
   });

   return (
      <MyComponentsContext.Provider
         value={{ myComponentData, componentDispatch }}
      >
         {props.children}
      </MyComponentsContext.Provider>
   );
};

export default MyComponentsContextProvider;
