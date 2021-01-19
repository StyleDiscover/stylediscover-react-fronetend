import React from 'react';

//MUI imports
import {
   Avatar,
   Typography,
   makeStyles,
   Grid,
   Container,
   Link as MUILink,
} from '@material-ui/core';

//MUI Make Styles
const useStyles = makeStyles({
   customUsername: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customProfilePicture: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customName: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customWebsite: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      color: 'black',
      cursor: 'pointer',
      marginTop: 5,
      textDecoration: 'underline',
      margin: 'auto',
   },
   customBio: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      color: 'black',
      marginTop: 5,
   },
});

export function ProfileDetailView({ userData }) {
   //use styles
   const classes = useStyles();

   return (
      <div>
         <Container maxWidth="xs" style={{ marginBottom: 25 }}>
            <Grid container={true}>
               <Grid item={true} xs={12}>
                  <div className={classes.customProfilePicture}>
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
                  </div>
               </Grid>
               <Grid item={true} xs={12} style={{ margin: 'auto' }}>
                  <Typography variant="h6" className={classes.customUsername}>
                     @{userData.username}
                  </Typography>
                  {userData.name && (
                     <Typography variant="body2" className={classes.customName}>
                        {userData.name}
                     </Typography>
                  )}
                  {userData.user_bio && (
                     <Typography variant="body1" className={classes.customBio}>
                        {userData.user_bio}
                     </Typography>
                  )}
                  {userData.user_website && (
                     <MUILink>
                        <Typography
                           variant="body2"
                           className={classes.customWebsite}
                           noWrap={true}
                           onClick={() => window.open(userData.user_website)}
                        >
                           {userData.user_website.toString().split('://')[1]}
                        </Typography>
                     </MUILink>
                  )}
               </Grid>
            </Grid>
         </Container>
      </div>
   );
}
