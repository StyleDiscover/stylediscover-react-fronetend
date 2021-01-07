//axios import
import axios from 'axios';
import { setMainPost } from './MainPostEvents';

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `${window.location.protocol}//${
           window.location.hostname + ':' + window.location.port
        }/`;

// EXPORT FUNTIONS
//login event
export const loginWithEmail = async (userData, userDispatch) => {
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
      .then((res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'email' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         const token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token, userData.username);
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
         _setAuthToken(token, username);
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
export const loginWithFacebook = async (facebookData, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/facebook/', facebookData, config)
      .then((res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'facebook' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         const token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token, res.data.user.username);
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

   await axios
      .put(`/users/userinfo/${username}/`, userInfo, config)
      .then((res) => {
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({
            type: 'SET_USER_PROFILE_PICTURE',
            data: res.data.profile_picture,
         });
         window.location.reload(false);
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
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
         localStorage.setItem('Username', res.data.username);
      })
      .catch((e) => {
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//register event
export const registerWithEmail = async (userData, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/registration/', userData, config)
      .then((res) => {
         userDispatch({ type: 'AUTHENTICATE' });
         userDispatch({ type: 'UNSET_ERROR_DATA' });
         userDispatch({ type: 'SET_LOGIN_METHOD', data: 'email' });
         userDispatch({ type: 'SET_USER_DATA', data: res.data.user });
         const token = res.data.token.split(',')[1].split("'")[1];
         _setAuthToken(token, userData.username);
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
         console.log(e.response.data);
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//logout from all devices event
export const logout = async (token, userDispatch) => {
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
         console.log(e.response.data);
         userDispatch({ type: 'UNSET_STATE' });
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
      .catch((e) => {
         console.log(e.response.data);
      });
   userDispatch({ type: 'NOT_LOADING' });
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
         console.log(e.response.data);
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
         console.log(e.response.data);
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return 0;
      });

   userDispatch({ type: 'NOT_LOADING' });
   return result;
};

//INTERNAL FUNCTIONS
//set local storage values
const _setAuthToken = async (token, username) => {
   const AccessToken = `Bearer ${token}`;
   localStorage.setItem('AccessToken', AccessToken);
   localStorage.setItem('Username', username);
   axios.defaults.headers.common['Authorization'] = AccessToken;
};

//remove local storage values
const _unsetAuthToken = async () => {
   localStorage.removeItem('AccessToken');
   localStorage.removeItem('Username');
   delete axios.defaults.headers.common['Authorization'];
};
