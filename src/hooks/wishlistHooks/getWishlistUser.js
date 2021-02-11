import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

export function useGetWishlist(username, enable, id) {
   return useInfiniteQuery(
      ['wishlist', username],
      async ({ pageParam = 1 }) => {
         const { data } = await axios.get(`/users/wishlist/${id}/`, {
            params: {
               page: pageParam,
            },
         });
         return data;
      },
      {
         enabled: !!enable,
         getNextPageParam: (lastPage) => lastPage.next,
      }
   );
}
