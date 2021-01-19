//react imports
import React, { useContext, useState } from 'react';

//MUI Imports
import { Container } from '@material-ui/core';

//context and events import
import { UserContext } from 'context/UserContext';
import { adminLoginAsUser } from 'events/UserEvents';
import LoginAsUserFormView from './LoginAsUserFormView';
import LoginAsUserUnauthView from './LoginAsUserUnauthView';

export function LoginAsUserContainer({ history }) {
   //use state
   const [username, setUsername] = useState('');

   //use context
   const { user, userDispatch } = useContext(UserContext);

   //funtions
   const handleChange = (event) => {
      //set username
      if (event.target.name === 'username') {
         setUsername(event.target.value);
      }
   };

   const handleSubmitChange = async (event) => {
      event.preventDefault();

      await adminLoginAsUser(username, userDispatch, history);
   };
   return (
      <Container className="margin-top-80" maxWidth="sm">
         {user.userData.account_type === 'AD' && (
            <LoginAsUserFormView
               user={user}
               username={username}
               handleSubmitChange={handleSubmitChange}
               handleChange={handleChange}
            />
         )}

         {user.userData.account_type !== 'AD' && <LoginAsUserUnauthView />}
      </Container>
   );
}
