import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function useDeleteBlog() {
   const queryClient = useQueryClient();
   return useMutation(
      (data) =>
         axios
            .delete(`/blogs/${data.id}/`, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data),
      {
         onSuccess: (blog, variable) => {
            queryClient.invalidateQueries(['blogs', variable.username]);
         },
      }
   );
}
