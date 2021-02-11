import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPostByCategory = async (userId) => {
   const { data } = await axios.get(`/mainposts/category/${userId}/`);
   return data;
};

export function useGetPostCollection(username, enable, id) {
   return useQuery(
      ['postcollection', username],
      () => fetchPostByCategory(id),
      {
         enabled: !!enable,
      }
   );
}
