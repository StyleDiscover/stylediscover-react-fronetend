import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { AXIOS_HEADER_FORMDATA } from 'utils';

export function useEditComponent() {
   const queryClient = useQueryClient();
   const editComponent = async (componentId, componentData) => {
      try {
         const data = await axios
            .put(
               `/editcomponent/${componentId}/`,
               componentData,
               AXIOS_HEADER_FORMDATA
            )
            .then((res) => res.data)
            .catch((err) => {
               throw err?.response?.data;
            });
         return data;
      } catch (error) {
         throw error;
      }
   };
   return useMutation((data) => editComponent(data.id, data.componentData), {
      onSuccess: (component) => {
         queryClient.invalidateQueries(['component', component.id]);
      },
   });
}
