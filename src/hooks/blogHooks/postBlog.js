import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function usePostBlog() {
   const queryClient = useQueryClient();
   const postBlog = async (blogData) => {
      try {
         const data = await axios
            .post('/blogs/', blogData, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data)
            .catch((err) => {
               throw err?.response?.data;
            });
         return data;
      } catch (error) {
         throw error;
      }
   };

   return useMutation((data) => postBlog(data.blogData), {
      onSuccess: (component, variables) => {
         queryClient.invalidateQueries(['blogs', variables?.username]);
         queryClient.invalidateQueries(['blogs']);
      },
   });
}
