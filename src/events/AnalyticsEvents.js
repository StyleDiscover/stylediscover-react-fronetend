//axios import
import axios from 'axios';

//google analytics
import ReactGA from 'react-ga';

//facebook pixel
import ReactPixel from 'react-facebook-pixel';

//pixel
ReactPixel.init('417164693036908');

//GA
ReactGA.initialize('UA-176723741-1');

//Axios Settings
// axios.defaults.baseURL =
//    window.location.port === '3000'
//       ? 'http://localhost:8000/'
//       : `${window.location.protocol}//${
//            window.location.hostname + ':' + window.location.port
//         }/`;

export const sendPageViewAnalytics = async (userId, postId) => {
   axios.get(`/sda/e/view?uid=${userId}&pid=${postId}`);
};

export const sendEventAnalytics = async (
   userId,
   postId,
   componentId,
   event
) => {
   await axios.get(
      `/sda/e/${event}?uid=${userId}&pid=${postId}&cid=${componentId}`
   );
   ReactGA.event({
      category: 'Component',
      action: `${event}`,
      label: `${userId} - ${componentId}`,
   });
   if (event === 'add_wishlist') {
      ReactPixel.track('AddToWishlist');
   }
};

//Analytics data display functions
//SUMMARY
export const getSummaryViews = async (from, to, userId) => {
   const data = await axios
      .get(`/api/v1/summary`, {
         params: {
            from,
            to,
            profileId: userId,
         },
      })
      .then((res) => {
         return res.data;
      })
      .catch((e) => {
         return e.response.data;
      });

   const testData = {
      responseStatus: 'SUCCESS',
      data: {
         add_wishlist: 48,
         buy_button: 131,
         view: 281,
      },
   };

   return data;
};

//DETAILS
export const getDetailsViews = async (from, to, userId) => {
   if (userId) {
      const data = await axios
         .get(`/api/v1/details`, {
            params: {
               from,
               to,
               profileId: userId,
            },
         })
         .then((res) => {
            return res.data;
         })
         .catch((e) => {
            return e.response.data;
         });
      var testData = {
         responseStatus: 'SUCCESS',
         data: {},
      };

      return data;
   }
};
