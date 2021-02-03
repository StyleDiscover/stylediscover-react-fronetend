import axios from 'axios';
import { useQuery } from 'react-query';

const fetchComponentById = async (componentId) => {
   const { data } = await axios.get(`/components/${componentId}/`);
   return data;
};

export function useGetComponentId(id) {
   return useQuery(['component', id], () => fetchComponentById(id));
}
