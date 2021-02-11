import React from 'react';
import { useHistory } from 'react-router-dom';
import BottomNavigationView from './BottomNavigationView';

export function BottomNavigationContainer() {
   const [value, setValue] = React.useState('recents');

   const history = useHistory();

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <div>
         <BottomNavigationView value={value} handleChange={handleChange} />
      </div>
   );
}
