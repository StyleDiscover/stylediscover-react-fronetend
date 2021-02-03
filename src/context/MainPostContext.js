// import React, { createContext, useReducer } from 'react';
// import { mainPostReducer } from '../reducers/MainPostReducer';

// export const MainPostContext = createContext();

// const MainPostContextProvider = (props) => {
//    const [mainPosts, mainPostDispatch] = useReducer(mainPostReducer, {
//       loading: false,
//       mainPosts: [],
//       errorData: {},
//    });

//    return (
//       <MainPostContext.Provider value={{ mainPosts, mainPostDispatch }}>
//          {props.children}
//       </MainPostContext.Provider>
//    );
// };

// export default MainPostContextProvider;
