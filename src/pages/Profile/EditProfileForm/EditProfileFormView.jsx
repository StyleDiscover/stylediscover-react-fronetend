import React from 'react';

//MUI Imports
import {
   Typography,
   TextField,
   makeStyles,
   Container,
   Divider,
   Button,
   CircularProgress,
} from '@material-ui/core';

//components import
import { ChangeUsername } from 'components';

const useStyles = makeStyles({
   customDivider: {
      margin: '10px 0px',
   },
});

export default function EditProfileFormView({
   bio,
   name,
   website,
   handleChange,
   handleUpdateUserInfo,
   loading,
   errorData,
}) {
   //usestyles
   const classes = useStyles();

   return (
      <Container maxWidth="xs">
         {/* CHANGE USERNAME STARTS */}
         {/* <Typography variant="body1">Change Username</Typography>
         <ChangeUsername />
         <Divider className={classes.customDivider} /> */}
         {/* CHANGE USERNAME ENDS */}

         {/* CHANGE USER DETAILS START */}
         <Typography variant="body1">Change User Info</Typography>
         <TextField
            variant="outlined"
            id="name"
            name="name"
            size="small"
            fullWidth={true}
            label="Name"
            style={{
               marginTop: 10,
               marginBottom: 10,
            }}
            onChange={handleChange}
            value={name}
         />
         <TextField
            variant="outlined"
            id="bio"
            name="bio"
            size="small"
            fullWidth={true}
            label="Bio"
            multiline={true}
            rows="3"
            rowsMax="5"
            style={{
               marginTop: 10,
               marginBottom: 10,
            }}
            onChange={handleChange}
            value={bio}
         />

         <TextField
            variant="outlined"
            id="website"
            name="website"
            size="small"
            fullWidth={true}
            label="Website"
            style={{
               marginTop: 10,
               marginBottom: 10,
            }}
            helperText={errorData.user_website}
            error={errorData.user_website ? true : false}
            onChange={handleChange}
            value={website}
         />
         <div className="usernameLogin">
            <Button
               type="submit"
               color="primary"
               variant="contained"
               size="small"
               disableElevation
               className={classes.submitStyles}
               disabled={loading}
               onClick={handleUpdateUserInfo}
            >
               Change User Info
               {loading && (
                  <CircularProgress
                     size={20}
                     className={classes.customProgress}
                  />
               )}
            </Button>
         </div>
         {/* CHANGE USER DETAILS ENDS */}
      </Container>
   );
}
