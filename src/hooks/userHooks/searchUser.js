import { useQuery } from 'react-query';
import axios from 'axios';

const searchUser = async (username) => {
   const { data } = await axios.get(
      `/users/search/?search=${username}&search_fields=username`
   );
   return data;
};

export function useSearchUser(username, enable) {
   return useQuery(['searchUser', username], () => searchUser(username), {
      enabled: !!enable,
   });
}
