import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

export function useGetCollectionByCategory(username, category, userId) {
   return useInfiniteQuery(
      ['postcollection', username, category],
      async ({ pageParam = 1 }) => {
         const { data } = await axios.get(
            `/mainposts/category/${category}/${userId}/`,
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
