import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function useEditBlog() {
   const queryClient = useQueryClient();
   const editBlog = async (blogId, blogData) => {
      try {
         const data = await axios
            .put(`/blogs/${blogId}/`, blogData, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data)
            .catch((err) => {
               throw err?.response?.data;
            });
         return data;
      } catch (error) {
         throw error;
      }
   };
   return useMutation((data) => editBlog(data.id, data.blogData), {
      onSuccess: (blog) => {
         queryClient.invalidateQueries(['blog', blog.id]);
      },
   });
}
