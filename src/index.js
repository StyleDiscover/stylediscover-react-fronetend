import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//provider imports
import UserContextProvider from './context/UserContext';
import MainPostContextProvider from './context/MainPostContext';
import WishlistContextProvider from './context/WishlistContext';
import MyComponentsContextProvider from './context/MyComponentContext';

//google analytics
import ReactGA from 'react-ga';

//facebook pixel
import ReactPixel from 'react-facebook-pixel';

//pixel
ReactPixel.init('417164693036908');

ReactGA.initialize('UA-176723741-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactPixel.pageView();

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
