//react imports
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

//context and events
import { MainPostContext } from '../context/MainPostContext';
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

//MUI Icons imports
import { Add } from '@material-ui/icons';

//components
import NonEditableMainPost from '../components/MainPost/NonEditableMainPost';
import CopyRedirect from '../components/Profile/CopyRedirect';

//MUI Make Styles
const useStyles = makeStyles({
   customUsername: {
      textAlign: 'center',
      marginBottom: 20,
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
   customCreateButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
   },
});

export default function Profile() {
   //use styles
   const classes = useStyles();

   //use history
   const history = useHistory();

   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //states
   const [userData, setUserData] = useState();

   //get username
   var username = localStorage.Username;

   //useeffect
   useEffect(() => {
      getMainPost(username, mainPostDispatch).then((data) => setUserData(data));
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
               {/* USER PROFILE PICTURE ENDS */}

               {/* USER COPY BUTTON STARTS */}
               <CopyRedirect />
               {/* USER COPY BUTTON ENDS */}

               {/* ADD BUTTON STARTS */}
               <Container
                  maxWidth="xs"
                  style={{
                     padding: '0px',
                     margin: '20px auto',
                     width: '100%',
                  }}
               >
                  <Button
                     variant="contained"
                     color="primary"
                     className={classes.customCreateButton}
                     startIcon={<Add />}
                     onClick={() => history.push('/create')}
                  >
                     Create A Post
                  </Button>
               </Container>
               {/* ADD BUTTON ENDS */}

               {/* USER POSTS STARTS */}
               {userData.main_posts.length > 0 && (
                  <Grid container={true} spacing={2}>
                     {userData.main_posts.map((id) => {
                        return (
                           <Grid item={true} xs={12} sm={6} lg={4} key={id}>
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
