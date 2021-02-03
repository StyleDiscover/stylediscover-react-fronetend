import axios from 'axios';
import { useInfiniteQuery, useQueryClient } from 'react-query';

export function useGetAllBlogs() {
   const queryClient = useQueryClient();

   return useInfiniteQuery(
      ['blogs'],
      async ({ pageParam = 1 }) => {
         const { data } = await axios.get(`/blogs/`, {
            params: {
               page: pageParam,
            },
         });
         return data;
      },
      {
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
