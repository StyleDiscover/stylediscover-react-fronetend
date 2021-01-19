import React from 'react';

//router-dom imports
import { Route, Switch, Redirect } from 'react-router-dom';

//constants
import {
   ROOT,
   ABOUT_US,
   LOGIN,
   LOGIN_AS_USER,
   SIGNUP,
   PASSWOD_RESET_CONFIRM,
   PASSWORD_RESET,
   PROFILE,
   WISHLIST,
   ANALYTICS,
   USER_PAGE,
   POST_PAGE,
   I_AM_BRAND,
   I_AM_INFLUENCER,
   T_AND_C,
   PRIVACY_POLICY,
   CREATE,
   MY_COLLECTION,
   CHANGE_USERNAME,
   EXPLORE,
} from './Constants';

//utils
import AuthRoute from 'utils/AuthRoute';
import UnAuthRoute from 'utils/UnAuthRoute';
import AdminRoute from 'utils/AdminRoute';

//page imports
import Register from 'pages/Register';
import Wishlist from 'pages/Wishlist';
import ChangeUsername from 'pages/ChangeUsername';
import ResetPassword from 'pages/ResetPassword';
import ResetPasswordConfirm from 'pages/ResetPasswordConfirm';
import PostPage from 'pages/PostPage';
import {
   Home,
   AboutUs,
   TermsAndConditions,
   ExploreMore,
   IAmBrand,
   IAmInfluencer,
   PrivacyPolicy,
   Profile,
   Create,
   Analytics,
   UserPage,
   Login,
   LoginAsUser,
   MyCollection,
} from 'pages';

export default function PublicRoutes() {
   return (
      <Switch>
         <Route exact path={ROOT} component={Home} />
         <Route exact path={ABOUT_US} component={AboutUs} />
         <Route exact path={I_AM_BRAND} component={IAmBrand} />
         <Route exact path={EXPLORE} component={ExploreMore} />
         <Route exact path={I_AM_INFLUENCER} component={IAmInfluencer} />
         <Route exact path={T_AND_C} component={TermsAndConditions} />
         <Route exact path={PRIVACY_POLICY} component={PrivacyPolicy} />

         {/* AUTH ROUTES CANNOT ACCESS WHEN AUTHENTICATED*/}
         <AuthRoute exact path={LOGIN} component={Login} />
         <AuthRoute exact path={SIGNUP} component={Register} />
         <AuthRoute exact path={PASSWORD_RESET} component={ResetPassword} />

         {/* UNAUTH ROUTE CANNOT ACCESS WHEN UNAUTHENTICATED*/}
         <UnAuthRoute exact path={CREATE} component={Create} />
         <UnAuthRoute exact path={PROFILE} component={Profile} />
         <UnAuthRoute exact path={WISHLIST} component={Wishlist} />
         <UnAuthRoute exact path={ANALYTICS} component={Analytics} />
         <UnAuthRoute exact path={MY_COLLECTION} component={MyCollection} />
         <UnAuthRoute exact path={CHANGE_USERNAME} component={ChangeUsername} />

         {/* ROUTES WITH PARAMETERS */}
         <Route
            exact
            path={PASSWOD_RESET_CONFIRM}
            component={ResetPasswordConfirm}
         />

         {/* ADMIN ROUTE */}
         <AdminRoute exact path={LOGIN_AS_USER} component={LoginAsUser} />

         {/* USERNAME ROUTE */}
         <Route exact path={USER_PAGE} component={UserPage} />
         <Route exact path={POST_PAGE} component={PostPage} />
      </Switch>
   );
}
