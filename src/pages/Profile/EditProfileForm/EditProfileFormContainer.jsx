import React, { useState, useEffect, useContext } from 'react';

//import context
import { UserContext } from 'context/UserContext';

//import services
import { updateUserInfo, setUserData } from 'events/UserEvents';
import EditProfileFormView from './EditProfileFormView';
export function EditProfileFormContainer() {
   //use context
   const { user, userDispatch } = useContext(UserContext);

   //use states
   const [bio, setBio] = useState('');
   const [website, setWebsite] = useState('');
   const [name, setName] = useState('');

   //useEffect
   useEffect(() => {
      if (user.userData) {
         setBio(user.userData.user_bio);
         setWebsite(user.userData.user_website);
         setName(user.userData.name);
      }
   }, [user.userData.user_bio, user.userData.user_website, user.userData.name]);

   //change profile picture
   const handleUpdateUserInfo = async (event) => {
      event.preventDefault();
      var userInfo = new FormData();
      userInfo.append('user_bio', bio);
      userInfo.append('name', name);
      userInfo.append('user_website', website);
      await updateUserInfo(userInfo, user.userData.username, userDispatch).then(
         async (res) => {
            if (res === 200) {
               await setUserData(user.userData.username, userDispatch);
            }
         }
      );
   };

   const handleChange = (event) => {
      if (event.target.name === 'bio') {
         setBio(event.target.value);
      } else if (event.target.name === 'website') {
         setWebsite(event.target.value);
      } else if (event.target.name === 'name') {
         setName(event.target.value);
      }
   };

   return (
      <EditProfileFormView
         bio={bio}
         name={name}
         website={website}
         handleChange={handleChange}
         handleUpdateUserInfo={handleUpdateUserInfo}
         loading={user.loading}
         errorData={user.errorData}
      />
   );
}
