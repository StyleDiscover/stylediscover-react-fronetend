//react imports
import React, { useContext, useState, useEffect, Suspense } from 'react';

//context and events import
import { UserContext } from 'context/UserContext';
import { updateUsername } from 'events/UserEvents';
const ChangeUsernameView = React.lazy(() => import('./ChangeUsernameView'));

export function ChangeUsernameContainer() {
   //use state
   const [newUsername, setNewUsername] = useState('');

   //use context
   const { user, userDispatch } = useContext(UserContext);

   //use effect
   useEffect(() => {
      setNewUsername(user.userData.username);
   }, [user.userData.username]);

   //funtions
   const handleChange = (event) => {
      //set username
      if (event.target.name === 'username') {
         setNewUsername(event.target.value);
      }
   };

   const handleSubmitChange = async (event) => {
      event.preventDefault();
      const newData = {
         username: newUsername.toLowerCase().replace(/\s/g, ''),
         modified_username: true,
      };
      await updateUsername(newData, user.userData.id, userDispatch);
   };

   return (
      <div>
         <Suspense fallback={<>Loading...</>}>
            <ChangeUsernameView
               user={user}
               newUsername={newUsername}
               handleChange={handleChange}
               handleSubmitChange={handleSubmitChange}
            />
         </Suspense>
      </div>
   );
}
