import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function useDeletePost() {
   const queryClient = useQueryClient();
   return useMutation(
      (data) =>
         axios
            .delete(`/mainposts/${data.id}/`, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data),
      {
         onSuccess: (post, variable) => {
            queryClient.invalidateQueries(['posts', variable.username]);
         },
      }
   );
}
