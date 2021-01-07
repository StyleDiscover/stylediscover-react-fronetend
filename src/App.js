//react imports
import { useEffect, useContext } from 'react';
import {
   BrowserRouter as Router,
   Route,
   Switch,
   Redirect,
} from 'react-router-dom';

//context imports
import { UserContext } from './context/UserContext';
import { MainPostContext } from './context/MainPostContext';
import { WishlistContext } from './context/WishlistContext';
import { MyComponentsContext } from './context/MyComponentContext';

//Event imports
import { setUserData } from './events/UserEvents';
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
import AuthRoute from './utils/AuthRoute';
import UnAuthRoute from './utils/UnAuthRoute';
import AdminRoute from './utils/AdminRoute';
import Theme from './utils/Theme';

//page imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create';
import UserPage from './pages/UserPage';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import ChangeUsername from './pages/ChangeUsername';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import TermsAndConditions from './pages/TermsAndConditions';
import PostPage from './pages/PostPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import IAmBrand from './pages/IAmBrand';
import LoginAsUser from './pages/LoginAsUser';
import MyCollection from './pages/MyCollection';

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
      const username = localStorage.Username;

      if (username) {
         setUserData(username, userDispatch).then(() => {
            setMainPost(username, mainPostDispatch);
            setWishlist(username, wishlistDispatch);
            setMyComponents(username, componentDispatch);
         });
      }
   }, []);

   return (
      <MUIThemeProvider theme={theme}>
         <Router>
            <Navbar />
            {/* //scroll to top */}
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/sd/aboutus" component={AboutUs} />
               <Route exact path="/sd/iamabrand" component={IAmBrand} />
               <Route
                  exact
                  path="/policy/termsandconditions"
                  component={TermsAndConditions}
               />
               <Route exact path="/policy/privacy" component={PrivacyPolicy} />

               {/* AUTH ROUTES CANNOT ACCESS WHEN AUTHENTICATED*/}
               <AuthRoute exact path="/login" component={Login} />
               <AuthRoute exact path="/signup" component={Register} />
               <AuthRoute
                  exact
                  path="/password/reset"
                  component={ResetPassword}
               />
               {/* UNAUTH ROUTE CANNOT ACCESS WHEN UNAUTHENTICATED*/}
               <UnAuthRoute exact path="/create" component={Create} />
               <UnAuthRoute exact path="/profile" component={Profile} />
               <UnAuthRoute exact path="/wishlist" component={Wishlist} />
               <UnAuthRoute
                  exact
                  path="/mycollection"
                  component={MyCollection}
               />
               <UnAuthRoute
                  exact
                  path="/firsttimelogin/changeusername"
                  component={ChangeUsername}
               />
               <Route
                  exact
                  path="/users/password/reset/confirm/:uid/:token"
                  component={ResetPasswordConfirm}
               />
               {/* ADMIN ROUTE */}
               <AdminRoute
                  exact
                  path="/sd/admin/loginasuser"
                  component={LoginAsUser}
               />
               {/* USERNAME ROUTE */}
               <Route exact path="/:username" component={UserPage} />
               <Route exact path="/post/:id" component={PostPage} />
            </Switch>
         </Router>
      </MUIThemeProvider>
   );
}

export default App;
