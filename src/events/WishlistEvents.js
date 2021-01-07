//axios import
import axios from 'axios';

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `${window.location.protocol}//${
           window.location.hostname + ':' + window.location.port
        }/`;

// EXPORT FUNCTIONS
// MAIN POST FUNCTIONS
//Set Wishlist Data
export const setWishlist = async (username, wishlistDispatch) => {
   wishlistDispatch({ type: 'LOADING' });

   await axios
      .get(`/users/wishlist/${username}/`)
      .then((res) => {
         wishlistDispatch({ type: 'UNSET_ERROR_DATA' });
         wishlistDispatch({
            type: 'SET_WISHLISTS',
            data: res.data.wishlist,
         });
      })
      .catch((e) => {
         wishlistDispatch({ type: 'UNSET_STATE' });
         wishlistDispatch({ type: 'LOADING' });
         wishlistDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   wishlistDispatch({ type: 'NOT_LOADING' });
};

//add to wishlist
export const addWishlist = async (username, wishlistData, wishlistDispatch) => {
   wishlistDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .put(`/users/wishlist/${username}/`, wishlistData, config)
      .then((res) => {
         wishlistDispatch({ type: 'UNSET_ERROR_DATA' });
         wishlistDispatch({
            type: 'SET_WISHLISTS',
            data: res.data.wishlist,
         });
      })
      .catch((e) => {
         wishlistDispatch({ type: 'UNSET_STATE' });
         wishlistDispatch({ type: 'LOADING' });
         wishlistDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   wishlistDispatch({ type: 'NOT_LOADING' });
};

//remove wishlist
export const removeWishlist = async (
   username,
   wishlistData,
   wishlistDispatch
) => {
   wishlistDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
      data: wishlistData,
   };

   await axios
      .delete(`/users/wishlist/${username}/`, config)
      .then((res) => {
         wishlistDispatch({ type: 'UNSET_ERROR_DATA' });
         wishlistDispatch({
            type: 'SET_WISHLISTS',
            data: res.data.wishlist,
         });
      })
      .catch((e) => {
         wishlistDispatch({ type: 'UNSET_STATE' });
         wishlistDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         console.log(e.response.data);
      });
   wishlistDispatch({ type: 'NOT_LOADING' });
};
