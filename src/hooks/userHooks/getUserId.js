import { useQuery } from 'react-query';
import axios from 'axios';

const getUser = async (userId) => {
   const { data } = await axios.get(`/users/${userId}/`);
   return data;
};

export function useGetUserById(userId, enable) {
   return useQuery(['userById', userId], () => getUser(userId), {
      enabled: !!enable,
   });
}
