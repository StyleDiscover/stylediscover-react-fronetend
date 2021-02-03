import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function useEditPost() {
   const queryClient = useQueryClient();
   return useMutation(
      (data) =>
         axios
            .put(`/mainposts/${data.id}/`, data.data, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data),
      {
         onSuccess: (post) => {
            queryClient.invalidateQueries(['post', post.id]);
         },
      }
   );
}
