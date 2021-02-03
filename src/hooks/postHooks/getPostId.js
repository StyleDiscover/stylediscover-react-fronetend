import axios from 'axios';
import { useQuery } from 'react-query';

const fetchPostById = async (postId) => {
   const { data } = await axios.get(`/mainposts/${postId}/`);
   return data;
};

export function useGetPostId(id) {
   return useQuery(['post', id], () => fetchPostById(id));
}
