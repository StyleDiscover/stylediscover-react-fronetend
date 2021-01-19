import React from 'react';

//MUI imports
import { Button, ButtonGroup, makeStyles, Container } from '@material-ui/core';

//makestyles
const useStyles = makeStyles({
   customButtonGroup: {
      margin: 'auto',
   },
   customContainer: {
      marginTop: 20,
      padding: 0,
   },
});

export default function ButtonGroupView({
   handleProfileButton,
   handleEditProfileDialogOpen,
   userData,
}) {
   //use style

   const classes = useStyles();
   return (
      <Container maxWidth="xs" className={classes.customContainer}>
         <ButtonGroup
            color="primary"
            className={classes.customButtonGroup}
            fullWidth={true}
         >
            <Button onClick={handleEditProfileDialogOpen}>Edit Profile</Button>
            {userData.account_type !== 'PR' && (
               <Button onClick={handleProfileButton}>Analytics</Button>
            )}
         </ButtonGroup>
      </Container>
   );
}
