import React from 'react';

//MUI Imports
import {
   makeStyles,
   Fab,
   Badge,
   CircularProgress,
   Avatar,
} from '@material-ui/core';

//MUI icons
import { CameraAlt } from '@material-ui/icons';

//component
import { DarkTooltip } from 'components';

const useStyles = makeStyles({
   customProfilePicture: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
      marginBottom: 20,
      marginTop: 20,
   },
   customProfileInput: {
      display: 'None',
   },
   customFabButton: {
      width: 30,
      height: 30,
   },
   customSize: {
      height: 20,
      width: 20,
   },
   custiomButtonRoot: {
      minHeight: 0,
   },
   customChangeProPicIcon: {
      width: 20,
      height: 20,
   },
});

export default function EditProfilePictureVeiw({
   updateProfilePicture,
   loading,
   userData,
}) {
   //use styles
   const classes = useStyles();
   return (
      <div className={classes.customProfilePicture}>
         <Badge
            overlap="circle"
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
            }}
            badgeContent={
               <div>
                  <input
                     accept="image/*"
                     className={classes.customProfileInput}
                     id="icon-button-file"
                     type="file"
                     onChange={updateProfilePicture}
                  />
                  <label htmlFor="icon-button-file">
                     {!loading && (
                        <DarkTooltip title="Update Picture" arrow>
                           <Fab
                              component="span"
                              className={classes.customFabButton}
                              classes={{
                                 sizeSmall: classes.customSize,
                                 root: classes.custiomButtonRoot,
                              }}
                           >
                              <CameraAlt
                                 className={classes.customChangeProPicIcon}
                              />
                           </Fab>
                        </DarkTooltip>
                     )}
                     {loading && (
                        <Fab
                           component="span"
                           className={classes.customFabButton}
                           disabled
                        >
                           <CircularProgress size={15} />
                        </Fab>
                     )}
                  </label>
               </div>
            }
         >
            {userData.profile_picture !== null ? (
               <Avatar
                  style={{
                     margin: '0px auto 10px auto',
                     width: 75,
                     height: 75,
                  }}
                  src={userData.profile_picture}
                  alt={userData.username}
               ></Avatar>
            ) : (
               <Avatar
                  style={{
                     margin: '0px auto 10px auto',
                     width: 75,
                     height: 75,
                  }}
                  alt={userData.username}
               ></Avatar>
            )}
         </Badge>
      </div>
   );
}
