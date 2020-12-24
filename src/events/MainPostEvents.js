//axios import
import axios from 'axios';

//Axios Settings
axios.defaults.baseURL =
   window.location.port === '3000'
      ? 'http://localhost:8000/'
      : `https://${
           window.location.hostname + ':' + window.location.port
        }/api/v1`;

// EXPORT FUNCTIONS
// MAIN POST FUNCTIONS
// publish main post
export const publishMainPost = async (
   mainPostData,
   componentData,
   mainPostDispatch
) => {
   mainPostDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const mainPostId = await axios
      .post('/mainposts/', mainPostData, config)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         mainPostDispatch({ type: 'ADD_MAIN_POST', data: res.data });
         return res.data.id;
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return -1;
      });
   await _addComponentsToMainPost(mainPostId, componentData, mainPostDispatch);
   mainPostDispatch({ type: 'NOT_LOADING' });
};

//Set Main Post Data
export const setMainPost = async (username, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });

   await axios
      .get(`/users/mainposts/${username}/`)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         mainPostDispatch({
            type: 'SET_MAIN_POSTS',
            data: res.data.main_posts,
         });
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   mainPostDispatch({ type: 'NOT_LOADING' });
};

//Get Main Post Data By Username
export const getMainPost = async (username, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });

   const userPosts = await axios
      .get(`/users/mainposts/${username}/`)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         return res.data;
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return e.response.data;
      });

   mainPostDispatch({ type: 'NOT_LOADING' });
   return userPosts;
};

//Get Main Post Data By Posst Id
export const getMainPostById = async (mainPostId, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });

   const mainPost = await axios
      .get(`/mainposts/${mainPostId}/`)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         return res.data;
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return e.response.data;
      });

   mainPostDispatch({ type: 'NOT_LOADING' });
   return mainPost;
};

//COMPONENT POST FUNCTIONS
//add component post
export const addComponent = async (componentData, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const componentId = await axios
      .post('/addcomponent/', componentData, config)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         return res.data.id;
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return -1;
      });
   mainPostDispatch({ type: 'NOT_LOADING' });
   return componentId;
};

//get component data by id
export const getComponentById = async (id) => {
   const componentData = await axios
      .get(`/components/${id}/`)
      .then((res) => {
         return res.data;
      })
      .catch((e) => {
         return e.response.data;
      });
   return componentData;
};

//get site_records_id for a hostname
export const getSiteRecord = async (hostname) => {
   const site_records_id = await axios
      .get(`/siterecord/${hostname}/`)
      .then((res) => {
         return res.data.id;
      })
      .catch((e) => {
         return 0;
      });
   return site_records_id;
};

//INTERNAL FUNCTIONS
//for main post
const _addComponentsToMainPost = async (
   mainPostId,
   componentData,
   mainPostDispatch
) => {
   const data = {
      component_posts: componentData,
   };

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .put(`/mainposts/${mainPostId}/`, data, config)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         mainPostDispatch({ type: 'REMOVE_MAIN_POST', id: mainPostId });
         mainPostDispatch({ type: 'ADD_MAIN_POST', data: res.data });
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         console.log(e.response.data);
      });
};