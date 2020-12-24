//react imports
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//context imports
import { UserContext } from './context/UserContext';
import { MainPostContext } from './context/MainPostContext';

//Event imports
import { setUserData } from './events/UserEvents';
import { setMainPost } from './events/MainPostEvents';

//MUI imports
import {
   ThemeProvider as MUIThemeProvider,
   createMuiTheme,
   responsiveFontSizes,
} from '@material-ui/core';

//page imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create';
import UserPage from './pages/UserPage';
import Profile from './pages/Profile';

//component imports
import Navbar from './components/General/Navbar';

//utils import
import AuthRoute from './utils/AuthRoute';
import UnAuthRoute from './utils/UnAuthRoute';
import Theme from './utils/Theme';

//theme
let theme = createMuiTheme(Theme);
theme = responsiveFontSizes(theme);

function App() {
   //global consts
   const { user, userDispatch } = useContext(UserContext);
   const { mainPosts, mainPostDispatch } = useContext(MainPostContext);
   useEffect(() => {
      //get token
      const token = localStorage.AccessToken;
      const username = localStorage.Username;

      if (token && username) {
         setUserData(token, username, userDispatch);
         setMainPost(username, mainPostDispatch);
      }
   }, []);

   return (
      <MUIThemeProvider theme={theme}>
         <Router>
            <Navbar />
            {/* //scroll to top */}
            <Switch>
               <Route exact path="/" component={Home} />
               {/* AUTH ROUTES CANNOT ACCESS WHEN AUTHENTICATED*/}
               <AuthRoute exact path="/login" component={Login} />
               <AuthRoute exact path="/signup" component={Register} />
               {/* UNAUTH ROUTE CANNOT ACCESS WHEN UNAUTHENTICATED*/}
               <UnAuthRoute exact path="/create" component={Create} />
               <UnAuthRoute exact path="/profile" component={Profile} />
               {/* USERNAME ROUTE */}
               <Route exact path="/:username" component={UserPage} />
            </Switch>
         </Router>
      </MUIThemeProvider>
   );
}

export default App;
