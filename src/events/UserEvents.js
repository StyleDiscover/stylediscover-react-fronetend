//axios import
import axios from 'axios';

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `https://${
           window.location.hostname + ':' + window.location.port
        }/api/v1`;

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
      })
      .catch((e) => {
         userDispatch({ type: 'UNSET_STATE' });
         userDispatch({ type: 'LOADING' });
         userDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   userDispatch({ type: 'NOT_LOADING' });
};

//register event
export const registerWithEmail = async (userData, userDispatch) => {
   userDispatch({ type: 'LOADING' });

   const data = {
      username: userData.username,
      name: userData.name,
      email: userData.email,
      password: userData.password,
   };

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .post('/users/auth/registration/', data, config)
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

//set user data event
export const setUserData = async (token, username, userDispatch) => {
   userDispatch({ type: 'LOADING' });

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

//INTERNAL FUNCTIONS
//set local storage values
const _setAuthToken = (token, username) => {
   const AccessToken = `Bearer ${token}`;
   localStorage.setItem('AccessToken', AccessToken);
   localStorage.setItem('Username', username);
   axios.defaults.headers.common['Authorization'] = AccessToken;
};

//remove local storage values
const _unsetAuthToken = () => {
   localStorage.removeItem('AccessToken');
   localStorage.removeItem('Username');
   delete axios.defaults.headers.common['Authorization'];
};
