//react imports
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//context imports
import { UserContext } from './context/UserContext';
import { MainPostContext } from './context/MainPostContext';
import { WishlistContext } from './context/WishlistContext';
import { MyComponentsContext } from './context/MyComponentContext';

//Event imports
import { setUserData, getUserDataByToken } from './events/UserEvents';
import { setMainPost } from './events/MainPostEvents';
import { setWishlist } from './events/WishlistEvents';
import { setMyComponents } from './events/MyComponentEvents';

//MUI imports
import {
   ThemeProvider as MUIThemeProvider,
   createMuiTheme,
   responsiveFontSizes,
} from '@material-ui/core';

//component imports
import Navbar from './components/General/Navbar';

//utils import
import Theme from './utils/Theme';
import Footer from './components/Static/Footer';

import ScrollToTop from './components/General/ScrollToTop';
import PublicRoutes from './navigation/PublicRoutes';

//theme
let theme = createMuiTheme(Theme);
theme = responsiveFontSizes(theme);

function App() {
   //global consts
   const { user, userDispatch } = useContext(UserContext);
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   const { wishlists, wishlistDispatch } = useContext(WishlistContext);
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

   useEffect(() => {
      //get token
      const token = localStorage.AccessToken;

      getUserDataByToken(token, userDispatch).then((data) => {
         if (data.username) {
            const username = data.username;
            setUserData(username, userDispatch);
            setMainPost(username, mainPostDispatch);
            setWishlist(username, wishlistDispatch);
            setMyComponents(username, componentDispatch);
         }
      });
   }, []);

   return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
         <MUIThemeProvider theme={theme}>
            <Router>
               <Navbar />
               {/* //scroll to top */}
               <ScrollToTop />
               <PublicRoutes />
               <div
                  style={{
                     paddingBottom: 125,
                  }}
               ></div>
               <Footer />
            </Router>
         </MUIThemeProvider>
      </div>
   );
}

export default App;
