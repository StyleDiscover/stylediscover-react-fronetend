// react imports
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//context and event
import { UserContext } from '../../context/UserContext';
import { getUserDataByUsername } from '../../events/UserEvents';

//MUI imports
import {
   Container,
   Paper,
   CardMedia,
   Typography,
   Link as MUILink,
   makeStyles,
   Grid,
} from '@material-ui/core';

//MUI Icons
import { Person } from '@material-ui/icons';

//usestyles
const useStyles = makeStyles({
   sideImage: {
      paddingTop: '100%',
      // width: '100%',
      borderRadius: 15,
   },
   imageSlider: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
   },
   customImagePaper: {
      borderRadius: 15,
   },
   mainPostRoot: {
      backgroundPosition: 'top',
   },
});

export default function InfluencerGallery({ username }) {
   //use styles
   const classes = useStyles();

   //usestate
   const [userInfo, setUserInfo] = useState(null);

   //use context
   const { userDispatch } = useContext(UserContext);

   //useEffect
   useEffect(() => {
      getUserData();
   }, []);

   //get user data
   const getUserData = async () => {
      const tempData = await getUserDataByUsername(username, userDispatch);
      setUserInfo(tempData);
   };

   return (
      userInfo &&
      !userInfo.detail &&
      userInfo.profile_picture && (
         <Grid item={true} xs={4} sm={2}>
            <div>
               <MUILink component={Link} to={`/${username}`}>
                  <CardMedia
                     image={userInfo.profile_picture}
                     className={classes.sideImage}
                     classes={{
                        root: classes.mainPostRoot,
                     }}
                  ></CardMedia>
                  <Typography
                     align="center"
                     variant="body2"
                     style={{
                        marginTop: 10,
                        fontFamily: 'Montserrat',
                     }}
                     noWrap
                  >
                     <b>@{username}</b>
                  </Typography>
               </MUILink>
            </div>
         </Grid>
      )
   );
}
