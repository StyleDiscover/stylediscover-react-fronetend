import { useQuery } from 'react-query';
import axios from 'axios';

const getUser = async (username) => {
   const { data } = await axios.get(`/users/userdetails/${username}/`);
   return data;
};

export function useGetUser(username) {
   return useQuery(['user', username], () => getUser(username));
}
