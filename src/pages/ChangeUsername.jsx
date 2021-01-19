//react imports
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   TextField,
   Link as MUILink,
   CircularProgress,
   makeStyles,
} from '@material-ui/core';

//context and events import
import { UserContext } from '../context/UserContext';
import { updateUsername } from '../events/UserEvents';

//MUI Make Styles
const useStyles = makeStyles({
   paperStyles: {
      padding: 20,
   },
   inputStyles: {
      marginTop: 20,
   },
   submitStyles: {
      marginTop: 20,
      marginRight: 10,
   },
   createAccount: {
      marginLeft: 5,
   },
   customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function ChangeUsername(props) {
   //use styles
   const classes = useStyles();

   //use state
   const [newUsername, setNewUsername] = useState('');

   //use context
   const { user, userDispatch } = useContext(UserContext);

   //use history
   let history = props.history;

   //funtions
   const handleChange = (event) => {
      //set username
      if (event.target.name === 'username') {
         setNewUsername(event.target.value);
      }
   };

   const handleSubmitNo = async (event) => {
      event.preventDefault();
      const newData = {
         username: user.userData.username,
         modified_username: true,
      };
      await updateUsername(newData, user.userData.id, userDispatch);
   };
   const handleSubmitChange = async (event) => {
      event.preventDefault();
      const newData = {
         username: newUsername.toLowerCase().replace(/\s/g, ''),
         modified_username: true,
      };
      await updateUsername(newData, user.userData.id, userDispatch);
   };

   if (user.userData.modified_username && history) {
      history.push('/profile');
   }

   return (
      <div>
         <Typography variant="h4">Change Username</Typography>
         {!user.userData.modified_username && (
            <div
               style={{
                  marginTop: 10,
               }}
            >
               <Typography variant="body1">
                  Your randomly generated username is{' '}
                  <b>{`${user.userData.username}`}</b>
               </Typography>
               <Typography variant="body2">
                  Do you wnat to change it?
               </Typography>
            </div>
         )}
         {user.userData.modified_username && (
            <div
               style={{
                  marginTop: 10,
               }}
            >
               <Typography variant="body1">Username Changed.</Typography>
               {/* <Typography variant="body2">
                     Do you wnat to change it?
                  </Typography> */}
            </div>
         )}
         <form noValidate>
            <TextField
               id="username"
               name="username"
               size="small"
               fullWidth={true}
               label="New Username"
               type="text"
               value={newUsername}
               helperText={
                  user.errorData.username ? user.errorData.username[0] : null
               }
               error={user.errorData.username ? true : false}
               onChange={handleChange}
               className={classes.inputStyles}
               variant="outlined"
               disabled={user.userData.modified_username}
            />
            <br />
            {user.errorData.detail && (
               <Typography variant="body2" className={classes.customError}>
                  {user.errorData.detail}
               </Typography>
            )}
            <div className="usernameLogin">
               <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disableElevation
                  className={classes.submitStyles}
                  disabled={user.loading || user.userData.modified_username}
                  onClick={handleSubmitNo}
               >
                  No
                  {newUsername === '' && user.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
               <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disableElevation
                  className={classes.submitStyles}
                  disabled={
                     newUsername === '' ||
                     user.loading ||
                     user.userData.modified_username
                  }
                  onClick={handleSubmitChange}
               >
                  Change Username
                  {newUsername === '' && user.loading && (
                     <CircularProgress
                        size={20}
                        className={classes.customProgress}
                     />
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
}
