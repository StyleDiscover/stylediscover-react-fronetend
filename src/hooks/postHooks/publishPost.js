import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA, AXIOS_HEADER_JSON } from 'utils';
import { PROFILE } from 'navigation/Constants';

export function usePublish() {
   const queryClient = useQueryClient();
   return useMutation(
      (data) =>
         axios
            .post('/mainposts/', data.mainPostData, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data),
      {
         onSuccess: async (post, variables) => {
            await axios.put(
               `/mainposts/${post.id}/`,
               {
                  component_posts: variables.componentPostData,
               },
               AXIOS_HEADER_JSON
            );
            variables.history.push(PROFILE);
            queryClient.invalidateQueries(['posts', post.username]);
         },
      }
   );
}
