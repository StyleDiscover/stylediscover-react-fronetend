import axios from 'axios';
import { useInfiniteQuery, useQueryClient } from 'react-query';

export function useGetPosts(username, enable, id) {
   const queryClient = useQueryClient();

   return useInfiniteQuery(
      ['posts', username],
      async ({ pageParam = 1 }) => {
         const { data } = await axios.get(`/users/mainposts/paginated/${id}/`, {
            params: {
               page: pageParam,
            },
         });
         return data;
      },
      {
         enabled: !!enable,
         getNextPageParam: (lastPage) => lastPage.next,
         onSuccess: (posts) => {
            posts.pages.forEach((page) => {
               page.results.forEach((post) => {
                  queryClient.setQueryData(['post', post.id], post);
               });
            });
         },
      }
   );
}
