import axios from 'axios';

export const getSiteRecord = async (hostname) => {
   const data = await axios
      .get(`/siterecord/${hostname}/`)
      .then((res) => res.data.id)
      .catch((err) => err?.response?.data);
   return data;
};
