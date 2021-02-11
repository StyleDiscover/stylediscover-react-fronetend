import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCategories = async () => {
   const { data } = await axios.get(`/mainposts/categorychoice/`);
   return data;
};

export function useGetCategory() {
   return useQuery(['categories'], () => fetchCategories());
}
