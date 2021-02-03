import axios from 'axios';
import { useInfiniteQuery, useQueryClient } from 'react-query';

export function useGetBlogs(username, enable, id) {
   const queryClient = useQueryClient();

   return useInfiniteQuery(
      ['blogs', username],
      async ({ pageParam = 1 }) => {
         const { data } = await axios.get(`/users/blogs/${id}/`, {
            params: {
               page: pageParam,
            },
         });
         return data;
      },
      {
         enabled: !!enable,
         getNextPageParam: (lastPage) => lastPage.next,
         onSuccess: (blogs) => {
            blogs.pages.forEach((page) => {
               page.results.forEach((blog) => {
                  queryClient.setQueryData(['blog', blog.id], blog);
               });
            });
         },
      }
   );
}
