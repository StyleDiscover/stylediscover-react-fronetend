import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

export function useGetPostPhotoOf(username, category, userId) {
   return useInfiniteQuery(
      ['postphotoof', username, category],
      async ({ pageParam = 1 }) => {
         const { data } = await axios.get(
            `/mainposts/photoof/${category}/${userId}/`,
            {
               params: {
                  page: pageParam,
               },
            }
         );
         return data;
      },
      {
         getNextPageParam: (lastPage) => lastPage.next,
      }
   );
}
