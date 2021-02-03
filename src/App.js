//react imports
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//axios
import axios from 'axios';

//react query imports
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

//context imports
import { UserContext } from './context/UserContext';
import { WishlistContext } from './context/WishlistContext';
import { MyComponentsContext } from './context/MyComponentContext';

//Event imports
import { setUserData, getUserDataByToken } from './events/UserEvents';
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

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `${window.location.protocol}//${
           window.location.hostname + ':' + window.location.port
        }/`;

//theme
let theme = createMuiTheme(Theme);
theme = responsiveFontSizes(theme);

//react query
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
      },
   },
});

function App() {
   //global consts
   const { userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);
   const { componentDispatch } = useContext(MyComponentsContext);

   useEffect(() => {
      //get token
      const token = localStorage.AccessToken;

      if (token) {
         getUserDataByToken(token, userDispatch).then((data) => {
            if (data.username) {
               const username = data.username;
               setUserData(username, userDispatch);
               setWishlist(username, wishlistDispatch);
               setMyComponents(username, componentDispatch);
            }
         });
      } else {
         userDispatch({ type: 'UNSET_STATE' });
      }
   }, []);

   return (
      <div style={{ minHeight: '100vh', position: 'relative' }}>
         <QueryClientProvider client={queryClient}>
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
            <ReactQueryDevtools />
         </QueryClientProvider>
      </div>
   );
}

export default App;
