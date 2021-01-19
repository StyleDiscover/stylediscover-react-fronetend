import React from 'react';

//MUI Imports
import {
   makeStyles,
   Dialog,
   Divider,
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Slide,
   Container,
} from '@material-ui/core';

//MUI Icons
import { Close, ArrowBack } from '@material-ui/icons';

//component improts
import EditProfilePictureVeiw from './EditProfilePictureVeiw';
import { EditProfileForm } from '.';

//use styles
const useStyles = makeStyles({
   customAppbar: {
      position: ' relative',
   },
   customTitle: {
      marginLeft: 10,
      flex: 1,
   },
});

//transition
const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfileDialogView({
   editProfileOpen,
   handleEditProfileDialogClose,
   loading,
   userData,
   updateProfilePicture,
}) {
   //usestyles
   const classes = useStyles();
   return (
      <Dialog
         fullScreen
         open={editProfileOpen}
         onClose={handleEditProfileDialogClose}
         TransitionComponent={Transition}
      >
         <AppBar className={classes.customAppbar}>
            <Container maxWidth="md" style={{ padding: 0 }}>
               <Toolbar>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleEditProfileDialogClose}
                     aria-label="close"
                  >
                     <ArrowBack />
                  </IconButton>
                  <Typography variant="h6" className={classes.customTitle}>
                     Edit Profile
                  </Typography>
                  {/* <Fab
                     autoFocus
                     onClick={handleEditProfileDialogClose}
                     size="medium"
                     variant="extended"
                  >
                     <Done style={{ marginRight: 5 }} />
                     Save
                  </Fab> */}
               </Toolbar>
            </Container>
         </AppBar>
         <Container maxWidth="md">
            <EditProfilePictureVeiw
               userData={userData}
               updateProfilePicture={updateProfilePicture}
               loading={loading}
            />
            <EditProfileForm userData={userData} />
         </Container>
      </Dialog>
   );
}
