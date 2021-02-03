import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function useAddComponent() {
   const queryClient = useQueryClient();
   const addComponent = async (componentData) => {
      try {
         const data = await axios
            .post('/addcomponent/', componentData, AXIOS_HEADER_FORMDATA)
            .then((res) => res.data)
            .catch((err) => {
               throw err?.response?.data;
            });
         return data;
      } catch (error) {
         throw error;
      }
   };

   return useMutation((data) => addComponent(data.componentData), {
      onSuccess: (component, variables) => {
         queryClient.invalidateQueries(['post', variables?.postId]);
      },
   });
}
