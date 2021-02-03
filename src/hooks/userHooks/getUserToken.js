import { useQuery } from 'react-query';
import axios from 'axios';

const getUser = async () => {
   const { data } = await axios.get(`/users/getusers/`);
   return data;
};

export function useGetUserToken(token) {
   axios.defaults.headers.common['Authorization'] = token;
   return useQuery(['user', 'main'], () => getUser());
}
