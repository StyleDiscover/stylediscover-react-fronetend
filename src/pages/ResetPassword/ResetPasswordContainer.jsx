//react imports
import React, { useContext, useState } from 'react';

//import views
import ResetEmailSentScreenView from './ResetEmailSentScreenView';

//MUI imports
import { Container } from '@material-ui/core';

//context and events import
import { UserContext } from 'context/UserContext';
import { resetPasswordSend } from 'events/UserEvents';
import ResetPasswordFormView from './ResetPasswordFormView';

export function ResetPasswordContainer({ history }) {
   //use state
   const [email, setEmail] = useState('');
   const [emailSent, setEmailSent] = useState(false);

   //use context
   const { user, userDispatch } = useContext(UserContext);

   //funtions
   const handleChange = (event) => {
      //set email
      if (event.target.name === 'email') {
         setEmail(event.target.value);
      }
   };

   const handleSubmitChange = async (event) => {
      event.preventDefault();

      const emailData = {
         email,
      };

      const result = await resetPasswordSend(emailData, userDispatch);

      if (result === 200) {
         setEmailSent(true);
      }
   };

   return (
      <Container className="margin-top-80" maxWidth="sm">
         {!emailSent && (
            <ResetPasswordFormView
               user={user}
               handleChange={handleChange}
               handleSubmitChange={handleSubmitChange}
               email={email}
            />
         )}
         {emailSent && <ResetEmailSentScreenView />}
      </Container>
   );
}
