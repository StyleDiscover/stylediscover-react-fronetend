import axios from 'axios';
import { useQuery } from 'react-query';

const fetchBlogById = async (blogId) => {
   const { data } = await axios.get(`/blogs/${blogId}/`);
   return data;
};

export function useGetBlogId(id) {
   return useQuery(['blog', id], () => fetchBlogById(id));
}
