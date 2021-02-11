import React from 'react';

//router-dom imports
import { Route, Switch } from 'react-router-dom';

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
   CREATE_BLOG,
   EXPLORE,
   BLOGS,
   BLOG_PAGE,
   PROFILE_TAB,
   USER_PAGE_TAB,
   SOW,
} from './Constants';

//utils
import AuthRoute from 'utils/AuthRoute';
import UnAuthRoute from 'utils/UnAuthRoute';
import AdminRoute from 'utils/AdminRoute';

import { loadable } from 'react-lazily/loadable';

//page imports
const { Home } = loadable(() => import('pages'));
const { AboutUs } = loadable(() => import('pages'));
const { TermsAndConditions } = loadable(() => import('pages'));
const { ExploreMore } = loadable(() => import('pages'));
const { IAmBrand } = loadable(() => import('pages'));
const { IAmInfluencer } = loadable(() => import('pages'));
const { PrivacyPolicy } = loadable(() => import('pages'));
const { Profile } = loadable(() => import('pages'));
const { Create } = loadable(() => import('pages'));
const { Analytics } = loadable(() => import('pages'));
const { UserPage } = loadable(() => import('pages'));
const { Login } = loadable(() => import('pages'));
const { LoginAsUser } = loadable(() => import('pages'));
const { MyCollection } = loadable(() => import('pages'));
const { PostPage } = loadable(() => import('pages'));
const { Register } = loadable(() => import('pages'));
const { ResetPassword } = loadable(() => import('pages'));
const { ResetPasswordConfirm } = loadable(() => import('pages'));
const { Wishlist } = loadable(() => import('pages'));
const { CreateBlog } = loadable(() => import('pages'));
const { Blogs } = loadable(() => import('pages'));
const { BlogsPage } = loadable(() => import('pages'));
const { SOWPage } = loadable(() => import('pages'));

export default function PublicRoutes() {
   return (
      <Switch>
         <Route exact path={ROOT} component={Home} />
         <Route exact path={ABOUT_US} component={AboutUs} />
         <Route exact path={I_AM_BRAND} component={IAmBrand} />
         <Route exact path={EXPLORE} component={ExploreMore} />
         <Route exact path={SOW} component={SOWPage} />
         <Route exact path={I_AM_INFLUENCER} component={IAmInfluencer} />
         <Route exact path={T_AND_C} component={TermsAndConditions} />
         <Route exact path={PRIVACY_POLICY} component={PrivacyPolicy} />
         <Route exact path={BLOGS} component={Blogs} />

         {/* AUTH ROUTES CANNOT ACCESS WHEN AUTHENTICATED*/}
         <AuthRoute exact path={LOGIN} component={Login} />
         <AuthRoute exact path={SIGNUP} component={Register} />
         <AuthRoute exact path={PASSWORD_RESET} component={ResetPassword} />

         {/* UNAUTH ROUTE CANNOT ACCESS WHEN UNAUTHENTICATED*/}
         <UnAuthRoute exact path={CREATE} component={Create} />
         <UnAuthRoute exact path={CREATE_BLOG} component={CreateBlog} />
         <UnAuthRoute exact path={PROFILE} component={Profile} />
         <UnAuthRoute exact path={PROFILE_TAB} component={Profile} />
         <UnAuthRoute exact path={WISHLIST} component={Wishlist} />
         <UnAuthRoute exact path={ANALYTICS} component={Analytics} />
         <UnAuthRoute exact path={MY_COLLECTION} component={MyCollection} />

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
         <Route exact path={USER_PAGE_TAB} component={UserPage} />
         <Route exact path={BLOG_PAGE} component={BlogsPage} />
      </Switch>
   );
}
