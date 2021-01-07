//axios import
import axios from 'axios';

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `${window.location.protocol}//${
           window.location.hostname + ':' + window.location.port
        }/`;

export const setMyComponents = async (username, componentDispatch) => {
   componentDispatch({ type: 'LOADING' });
   let componentList = [];
   let counts = {};

   if (username) {
      const userComponents = await _getUserComponents(
         username,
         componentDispatch
      );
      userComponents.main_posts.forEach((main_post) => {
         componentList = [...main_post.component_posts, ...componentList];
      });
      componentList.forEach(function (x) {
         counts[x] = (counts[x] || 0) + 1;
      });
   }

   if (Object.keys(counts).length !== 0) {
      const sortedComponentList = Object.keys(counts).sort(function (a, b) {
         return -(counts[a] - counts[b]);
      });

      componentDispatch({ type: 'SET_COMPONENT', data: sortedComponentList });
   }
   componentDispatch({ type: 'NOT_LOADING' });
};

const _getUserComponents = async (username, componentDispatch) => {
   componentDispatch({ type: 'LOADING' });
   const userComponents = await axios
      .get(`/users/mycomponents/${username}/`)
      .then((res) => {
         return res.data;
      })
      .catch((e) => {
         return e.response.data;
      });
   componentDispatch({ type: 'NOT_LOADING' });
   return userComponents;
};
