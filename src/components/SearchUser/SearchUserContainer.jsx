import { useGetUserById, useSearchUser } from 'hooks';
import React from 'react';
import SearchUserView from './SearchUserView';

export function SearchUserContainer({ handleSelect, defaultUser }) {
   const [value, setValue] = React.useState(null);
   const [inputValue, setInputValue] = React.useState('');
   const [options, setOptions] = React.useState([]);

   const { data: userSearchResult, status: searchStatus } = useSearchUser(
      inputValue,
      true
   );

   const { data: userData, status: userStatus } = useGetUserById(
      defaultUser,
      Boolean(defaultUser)
   );

   React.useEffect(() => {
      if (Boolean(defaultUser) && userStatus === 'success') {
         setValue(userData ? userData : []);
      }

      if (inputValue === '') {
         setOptions(value ? [value] : []);
         return undefined;
      }

      if (searchStatus === 'success') {
         let newOptions = [];

         if (userSearchResult?.results.length > 0) {
            userSearchResult?.results.forEach((result) => {
               newOptions = [...newOptions, ...[result]];
            });
         }

         setOptions(newOptions);
      }
   }, [
      value,
      inputValue,
      userSearchResult,
      searchStatus,
      defaultUser,
      userData,
      userStatus,
   ]);

   const handleChange = (event, newValue) => {
      setOptions(newValue ? [newValue, ...options] : options);
      handleSelect(newValue);
      setValue(newValue);
   };

   const handleInputChange = (event, newInputValue) => {
      setInputValue(newInputValue);
   };

   return (
      <div>
         <SearchUserView
            value={value}
            handleInputChange={handleInputChange}
            handleChange={handleChange}
            status={searchStatus}
            options={options}
         />
      </div>
   );
}
