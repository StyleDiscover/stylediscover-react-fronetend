//react imports
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

//context and events
import { MainPostContext } from '../context/MainPostContext';
import { sendPageViewAnalytics } from '../events/AnalyticsEvents'; //analytics events
import { getMainPost } from '../events/MainPostEvents';

//MUI Imports
import {
   Typography,
   Button,
   Container,
   Paper,
   Grid,
   Avatar,
   Link as MUILink,
   makeStyles,
} from '@material-ui/core';
import NonEditableMainPost from './MainPost/NonEditableMainPost';

//MUI Icons
import { Launch } from '@material-ui/icons';

//MUI Make Styles
const useStyles = makeStyles({
   customUsername: {
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
      color: 'black',
   },
   customPaper: {
      paddingTop: 20,
      color: '#333333',
      margin: '20px 0px',
   },
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
   customWebsiteButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
      marginBottom: 10,
   },
});

export default function UserPage() {
   //use styles
   const classes = useStyles();

   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //get the username
   let { username } = useParams();

   //states
   const [userData, setUserData] = useState();

   //useeffect
   useEffect(() => {
      getMainPost(username, mainPostDispatch).then((data) => {
         setUserData(data);
         if (data.id) {
            sendPageViewAnalytics(data.id);
         }
      });
   }, []);

   return (
      <Container maxWidth="lg" className="margin-top-80">
         {userData && userData.detail && (
            <div>
               <Typography className={classes.customNoPostMessage}>
                  404 USER NOT FOUND
               </Typography>
            </div>
         )}
         {userData && userData.username && (
            <div>
               {/* USER PROFILE PICTURE STARTS */}
               <Typography variant="body1" className={classes.customUsername}>
                  {userData.profile_picture ? (
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
                  @{userData.username}
               </Typography>
               <Container
                  maxWidth="xs"
                  style={{
                     padding: '0px',
                     margin: '0px auto 20px auto',
                     width: '100%',
                  }}
               >
                  <Button
                     color="primary"
                     variant="text"
                     className={classes.customWebsiteButton}
                     startIcon={<Launch />}
                     onClick={() => window.open(userData.user_website)}
                  >
                     <Typography variant="body2">My Website</Typography>
                  </Button>
               </Container>
               {/* USER PROFILE PICTURE ENDS */}
               {/*  */}
               {/*  */}
               {/* USER POSTS STARTS */}
               {userData.main_posts.length > 0 && (
                  <Grid container={true} spacing={2}>
                     {userData.main_posts.map((id) => {
                        return (
                           <Grid item={true} xs={12} sm={6} lg={4}>
                              <NonEditableMainPost id={id} />
                           </Grid>
                        );
                     })}
                  </Grid>
               )}
               {userData.main_posts.length === 0 && (
                  <Typography
                     className={classes.customNoPostMessage}
                     variant="body2"
                  >
                     No Posts
                  </Typography>
               )}
               {/* USER POSTS ENDS */}
            </div>
         )}
      </Container>
   );
}
