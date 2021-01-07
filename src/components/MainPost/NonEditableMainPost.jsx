//react imports
import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

//import component
import NonEditableComponentPost from '../ComponentPost/NonEditableComponentPost';

//crypto imports
import AES from 'crypto-js/aes';

//context and events imports
import { MainPostContext } from '../../context/MainPostContext';
import { getMainPostById } from '../../events/MainPostEvents';

//time ago
import TimeAgo from 'react-timeago';

//MUI Imports
import {
   Card,
   CardMedia,
   CardContent,
   Grid,
   makeStyles,
   CardHeader,
   Typography,
   Avatar,
   IconButton,
} from '@material-ui/core';

//MUI make style
const useStyles = makeStyles({
   imgStyle: {
      height: 0,
      paddingTop: '100%',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
   },
   mainPostRoot: {
      backgroundPosition: 'cover',
   },
});

export default function NonEditableMainPost({ id }) {
   //use styles
   const classes = useStyles();

   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //states
   const [mainPostData, setMainPostData] = useState();

   //use history
   const history = useHistory();

   const encryptedId = AES.encrypt(`${id}`, 'Pjmaq7EV2C7lQeaUuLVD')
      .toString()
      .replace(/\//g, '*');

   //use effect
   useEffect(() => {
      getMainPostById(id, mainPostDispatch).then((data) =>
         setMainPostData(data)
      );
   }, []);

   return (
      <div>
         {mainPostData && (
            <Card>
               {/* CARD HEADER STARTS */}
               <CardHeader
                  title={
                     <Typography variant="body1" style={{ fontSize: 14 }}>
                        {mainPostData.name
                           ? mainPostData.name
                           : mainPostData.username}
                     </Typography>
                  }
                  subheader={
                     <Typography variant="body2" style={{ fontSize: 11 }}>
                        <TimeAgo
                           date={mainPostData.created_at}
                           minPeriod={30}
                        />
                     </Typography>
                  }
                  avatar={
                     mainPostData.profile_picture !== null ? (
                        <Avatar
                           src={mainPostData.profile_picture}
                           alt={mainPostData.username}
                           style={{
                              width: 30,
                              height: 30,
                           }}
                        ></Avatar>
                     ) : (
                        <Avatar
                           alt={mainPostData.username}
                           style={{
                              width: 30,
                              height: 30,
                           }}
                        ></Avatar>
                     )
                  }
                  // action={
                  //    <div>
                  //       <IconButton
                  //          style={{ margin: '0px 5px' }}
                  //          aria-controls="edit-menu"
                  //          aria-haspopup="true"
                  //          onClick={OpenEditMenu}
                  //       >
                  //          <MoreVert />
                  //       </IconButton>
                  //    </div>
                  // }
               ></CardHeader>
               {/* CARD HEADER ENDS */}

               {/* MAIN IMAGE STARTS */}
               {mainPostData.media_type === 'IM' && (
                  <CardMedia
                     className={classes.imgStyle}
                     image={mainPostData.media_url}
                     classes={{
                        root: classes.mainPostRoot,
                     }}
                     onClick={() => {
                        history.push(`/post/${encryptedId}`);
                     }}
                  ></CardMedia>
               )}
               {mainPostData.media_type === 'VD' && (
                  <CardMedia
                     image={mainPostData.media_url}
                     component="video"
                     autoPlay
                     loop
                     muted
                     style={{ cursor: 'pointer' }}
                     onClick={() => {
                        history.push(`/post/${encryptedId}`);
                     }}
                  ></CardMedia>
               )}
               {/* MAIN IMAGE ENDS */}
               {/* COMPONENT IMAGES START */}
               <CardContent>
                  <Grid container={true} spacing={2}>
                     {mainPostData.component_posts.length > 0 &&
                        mainPostData.component_posts.map((componentId) => {
                           return (
                              <Grid item xs={3} key={componentId}>
                                 <NonEditableComponentPost
                                    componentId={componentId}
                                    mainPostId={mainPostData.id}
                                    userId={mainPostData.user_id}
                                 />
                              </Grid>
                           );
                        })}
                  </Grid>
               </CardContent>
               {/* COMPONENT IMAGES END */}
            </Card>
         )}
      </div>
   );
}
