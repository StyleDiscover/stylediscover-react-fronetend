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
// publish main post
export const publishMainPost = async (
   mainPostData,
   componentData,
   mainPostDispatch,
   history
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
         mainPostDispatch({ type: 'ADD_MAIN_POST', data: res.data.id });
         return res.data.id;
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         return -1;
      });
   await _addComponentsToMainPost(mainPostId, componentData, mainPostDispatch);
   history.push({ pathname: '/profile', state: { published: true } });
   mainPostDispatch({ type: 'NOT_LOADING' });
};

// edit main post
export const editMainPost = async (
   mainPostData,
   mainPostId,
   mainPostDispatch
) => {
   mainPostDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .put(`/mainposts/${mainPostId}/`, mainPostData, config)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         mainPostDispatch({ type: 'RELOAD_MAIN_POST', id: mainPostId });
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
   mainPostDispatch({ type: 'NOT_LOADING' });
   // window.location.reload(false);
};

// delete main post
export const deleteMainPost = async (mainPostId, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   await axios
      .delete(`/mainposts/${mainPostId}/`, config)
      .then((res) => {
         mainPostDispatch({ type: 'UNSET_ERROR_DATA' });
         mainPostDispatch({ type: 'REMOVE_MAIN_POST', id: mainPostId });
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
      });
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

//edit component post
export const editComponent = async (componentData, id, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });

   const config = {
      headers: {
         'Content-Type': 'multipart/form-data',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const componentId = await axios
      .put(`/editcomponent/${id}/`, componentData, config)
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
      .then(async (res) => {
         return res.data.id;
      })
      .catch((e) => {
         return 0;
      });
   return site_records_id;
};

//get site_records_id for a hostname
export const getSiteMedia = async (hostname, url, mainPostDispatch) => {
   const site_media_url = await axios
      .get(`/siterecord/${hostname}/`)
      .then(async (res) => {
         const siteConfig = JSON.parse(res.data.xpath);
         const siteRecordData = { url, ...siteConfig };
         const siteMediaUrl = await _getSiteMediaUrl(
            siteRecordData,
            mainPostDispatch
         );
         if (siteMediaUrl) {
            return siteMediaUrl;
         } else {
            return null;
         }
      })
      .catch((e) => {
         return null;
      });
   return site_media_url;
};

//sending email
export const sendEmailToAdmin = async (subject, message, username) => {
   const data = {
      subject,
      message,
      username,
   };

   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };

   const status = await axios
      .post('/mainposts/sendemail/', data, config)
      .then((res) => {
         return res.status;
      })
      .catch((e) => {
         return 400;
      });
   return status;
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
         mainPostDispatch({ type: 'ADD_MAIN_POST', data: mainPostId });
      })
      .catch((e) => {
         mainPostDispatch({ type: 'UNSET_STATE' });
         mainPostDispatch({ type: 'LOADING' });
         mainPostDispatch({ type: 'SET_ERROR_DATA', data: e.response.data });
         console.log(e.response.data);
      });
};

const _getSiteMediaUrl = async (data, mainPostDispatch) => {
   mainPostDispatch({ type: 'LOADING' });
   const config = {
      headers: {
         'Content-Type': 'application/json',
         'X-CSRFToken': '{{csrf_token}}',
      },
   };
   const mediaUrl = await axios
      .post('/scrape', data, config)
      .then((res) => {
         return res.data.data;
      })
      .catch((e) => {
         return null;
      });
   mainPostDispatch({ type: 'NOT_LOADING' });
   return mediaUrl;
};
