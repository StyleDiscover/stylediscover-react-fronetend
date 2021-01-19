//axios import
import axios from 'axios';
import { addWishlist } from './WishlistEvents';
import { sendEventAnalytics } from './AnalyticsEvents';

//facebook pixel
import ReactPixel from 'react-facebook-pixel';

//pixel
ReactPixel.init('417164693036908');

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `${window.location.protocol}//${
           window.location.hostname + ':' + window.location.port
        }/`;

// EXPORT FUNTIONS
//login event
export const loginWithEmail = async (
   userData,
   userDispatch,
   post,
   wishlist,
   wishlistDispatch,
   postUsername,
   history
) => {
   userDispatch({ type: 'LOADING' });
   const data = {
      username: userData.username,
      password: userData.password,
   };

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/login/', data, config)
      .then(async (res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'email' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         const token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token);
         if (wishlist !== null && post !== null) {
            const wishlistData = {
               component_id: wishlist,
            };
            await addWishlist(
               res.data.user.username,
               wishlistData,
               wishlistDispatch
            ).then(() => {
               sendEventAnalytics(
                  res.data.user.id,
                  post,
                  wishlist,
                  'add_wishlist'
               );
            });
            history.push(`/wishlist?username=${postUsername}`);
         }
         userDispatch({ type: 'NOT_LOADING' });
         window.location.reload(false);
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//admin login as user event
export const adminLoginAsUser = async (username, userDispatch, history) => {
   userDispatch({ type: 'LOADING' });

   await axios
      .get(`/users/admin/loginwithusername/${username}/`)
      .then(async (res) => {
         var token = localStorage.AccessToken;
         await logout(token, userDispatch);
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'email' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token);
         userDispatch({ type: 'NOT_LOADING' });
         history.push('/profile');
         window.location.reload(false);
      })
      .catch((e) => {
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//facebook login event
export const loginWithFacebook = async (
   facebookData,
   userDispatch,
   post,
   wishlist,
   wishlistDispatch,
   postUsername,
   history
) => {
   userDispatch({ type: 'LOADING' });
   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/facebook/', facebookData, config)
      .then(async (res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'facebook' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         const token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token);
         if (wishlist !== null && post !== null) {
            const wishlistData = {
               component_id: wishlist,
            };
            await addWishlist(
               res.data.user.username,
               wishlistData,
               wishlistDispatch
            ).then(() => {
               sendEventAnalytics(
                  res.data.user.id,
                  post,
                  wishlist,
                  'add_wishlist'
               );
            });
            history.push(`/wishlist?username=${postUsername}`);
            window.location.reload(false);
         }
         userDispatch({ type: 'NOT_LOADING' });
         window.location.reload(false);
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//update info event
export const updateUserInfo = async (userInfo, username, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const res = await axios
      .put(`/users/userinfo/${username}/`, userInfo, config)
      .then(async (res) => {
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({
            type: 'SET_USER_PROFILE_PICTURE',
            data: res.data.profile_picture,
         });
         return res.status;
      })
      .catch((e) => {
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return e.response.status;
      });
   userDispatch({ type: 'NOT_LOADING' });
   return res;
};

//update username event
export const updateUsername = async (userInfo, userId, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .put(`/users/changeusername/${userId}/`, userInfo, config)
      .then((res) => {
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({
            type: 'SET_USERNAME',
            data: res.data.username,
         });
      })
      .catch((e) => {
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//register event
export const registerWithEmail = async (
   userData,
   userDispatch,
   post,
   wishlist,
   wishlistDispatch,
   postUsername,
   history
) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/registration/', userData, config)
      .then(async (res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'email' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         const token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token);
         if (wishlist !== null && post !== null) {
            const wishlistData = {
               component_id: wishlist,
            };
            await addWishlist(
               res.data.user.username,
               wishlistData,
               wishlistDispatch
            ).then(() => {
               sendEventAnalytics(
                  res.data.user.id,
                  post,
                  wishlist,
                  'add_wishlist'
               );
            });
            ReactPixel.track('CompleteRegistration');
            history.push(`/wishlist?username=${postUsername}`);
         }
         ReactPixel.track('CompleteRegistration');
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//logout event
export const logoutAll = async (token, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const data = {
      token: token,
   };

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/knox/logoutall/', data, config)
      .then(() => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         _unsetAuthToken();
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//logout from all devices event
export const logout = async (
   token,
   userDispatch,
   mainPostDispatch,
   componentDispatch,
   wishlistDispatch
) => {
   userDispatch({ type: 'LOADING' });

   const data = {
      token: token,
   };

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/knox/logout/', data, config)
      .then(() => {
         userDispatch({ type: 'UNSET_STATE' });
         _unsetAuthToken();
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'UNSET_STATE_LOGOUT' });
         componentDispatch({ type: 'UNSET_STATE' });
         wishlistDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//set user data event
export const setUserData = async (username, userDispatch) => {
   userDispatch({ type: 'LOADING' });
   const token = localStorage.AccessToken;

   await axios
      .get(`/users/userdetails/${username}/`)
      .then((res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'email' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data });
         axios.defaults.headers.common['Authorization'] = token;
      })
      .catch((e) => {});
   userDispatch({ type: 'NOT_LOADING' });
};

//set user data event
export const getUserDataByUsername = async (username, userDispatch) => {
   userDispatch({ type: 'LOADING' });
   const token = localStorage.AccessToken;

   const data = await axios
      .get(`/users/userdetails/${username}/`)
      .then((res) => {
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         return res.data;
      })
      .catch((e) => {
         return e.response.data;
      });
   userDispatch({ type: 'NOT_LOADING' });
   return data;
};

//reset user password
export const resetPasswordSend = async (emailData, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const result = await axios
      .post('/users/auth/password/reset/', emailData, config)
      .then((res) => {
         userDispatch({ type: 'UNSET_STATE' });
         return res.status;
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return 0;
      });

   userDispatch({ type: 'NOT_LOADING' });
   return result;
};

//reset user password
export const resetPasswordConfirm = async (newPasswordData, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const result = await axios
      .post('/users/auth/password/reset/confirm/', newPasswordData, config)
      .then((res) => {
         userDispatch({ type: 'UNSET_STATE' });
         return res.status;
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return 0;
      });

   userDispatch({ type: 'NOT_LOADING' });
   return result;
};

//get username from token
export const getUserDataByToken = async (token, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   axios.defaults.headers.common['Authorization'] = token;

   const data = await axios
      .get(`/users/getusers/`)
      .then((res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data });
         return res.data;
      })
      .catch((e) => {
         return e.response.data;
      });
   userDispatch({ type: 'NOT_LOADING' });
   return data;
};

//INTERNAL FUNCTIONS
//set local storage values
const _setAuthToken = async (token) => {
   const AccessToken = `Bearer ${token}`;
   localStorage.setItem('AccessToken', AccessToken);
   axios.defaults.headers.common['Authorization'] = AccessToken;
};

//remove local storage values
const _unsetAuthToken = async () => {
   localStorage.removeItem('AccessToken');
   delete axios.defaults.headers.common['Authorization'];
};
