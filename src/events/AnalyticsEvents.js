//axios import
import axios from 'axios';

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `${window.location.protocol}//${
           window.location.hostname + ':' + window.location.port
        }/`;

export const sendPageViewAnalytics = async (userId, postId) => {
   axios.get(`/sda/e/view?uid=${userId}&pid=${postId}`);
};

export const sendEventAnalytics = async (
   userId,
   postId,
   componentId,
   event
) => {
   axios.get(`/sda/e/${event}?uid=${userId}&pid=${postId}&cid=${componentId}`);
};
