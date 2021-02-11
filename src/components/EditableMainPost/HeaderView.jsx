import React from 'react';

//MUI Imports
import { CardHeader, Typography, Avatar, IconButton } from '@material-ui/core';

//MUI Icons
import { MoreVert } from '@material-ui/icons';

//time ago
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';

export default function Header({ mainPostData, openEditMenu }) {
   return (
      mainPostData && (
         <div>
            <CardHeader
               title={
                  <Typography
                     variant="body1"
                     style={{
                        fontSize: 14,
                        textDecoration: 'none',
                        color: '#333',
                     }}
                     component={Link}
                     to={'/' + mainPostData.username}
                  >
                     {mainPostData.name
                        ? mainPostData.name
                        : mainPostData.username}
                  </Typography>
               }
               subheader={
                  <Typography variant="body2" style={{ fontSize: 11 }}>
                     <TimeAgo date={mainPostData.created_at} minPeriod={30} />
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
               action={
                  <div>
                     <IconButton
                        style={{ margin: '0px 5px' }}
                        aria-controls="edit-menu"
                        aria-haspopup="true"
                        onClick={openEditMenu}
                     >
                        <MoreVert />
                     </IconButton>
                  </div>
               }
            ></CardHeader>
         </div>
      )
   );
}
