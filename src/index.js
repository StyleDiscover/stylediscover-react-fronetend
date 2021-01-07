import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//provider imports
import UserContextProvider from './context/UserContext';
import MainPostContextProvider from './context/MainPostContext';
import WishlistContextProvider from './context/WishlistContext';
import MyComponentsContextProvider from './context/MyComponentContext';

ReactDOM.render(
   <React.StrictMode>
      <WishlistContextProvider>
         <UserContextProvider>
            <MainPostContextProvider>
               <MyComponentsContextProvider>
                  <App />
               </MyComponentsContextProvider>
            </MainPostContextProvider>
         </UserContextProvider>
      </WishlistContextProvider>
   </React.StrictMode>,
   document.getElementById('root')
);
