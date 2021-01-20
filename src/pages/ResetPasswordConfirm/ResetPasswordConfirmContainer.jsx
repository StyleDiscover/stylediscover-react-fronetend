//react imports
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

//import context and events
import { UserContext } from 'context/UserContext';
import { resetPasswordConfirm } from 'events/UserEvents';

//MUI Imports
import { Container } from '@material-ui/core';

//import View
import LoginAfterResetScreenView from './LoginAfterResetScreenView';
import ResetPasswordConfirmFormView from './ResetPasswordConfirmFormView';

export function ResetPasswordConfirmContainer() {
   //use context
   const { user, userDispatch } = useContext(UserContext);

   //states
   const [new_password1, setNewPassword] = useState('');
   const [renew_Password, setReNewPassword] = useState('');
   const [resetSuccess, setResetSuccess] = useState(false);

   //get the reset token
   let { uid, token } = useParams();

   //function
   const handleChange = (event) => {
      //set new_password1
      if (event.target.name === 'new_password1') {
         setNewPassword(event.target.value);
      }

      //set new_password2
      if (event.target.name === 'new_password2') {
         setReNewPassword(event.target.value);
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const newPasswordData = {
         uid,
         token,
         new_password1,
         new_password2: renew_Password,
      };

      const result = await resetPasswordConfirm(newPasswordData, userDispatch);

      if (result === 200) {
         setResetSuccess(true);
      }
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         {!resetSuccess && (
            <ResetPasswordConfirmFormView
               user={user}
               handleChange={handleChange}
               handleSubmit={handleSubmit}
               renew_Password={renew_Password}
               new_password1={new_password1}
            />
         )}
         {resetSuccess && <LoginAfterResetScreenView />}
      </Container>
   );
}
