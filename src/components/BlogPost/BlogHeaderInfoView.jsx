import { CardHeader, Typography } from '@material-ui/core';
import { BlogAction } from 'components';
import React from 'react';
import ReactTimeago from 'react-timeago';

export default function BlogHeaderInfoView({ date, username, id }) {
   return (
      <CardHeader
         title={
            <Typography variant="body2" style={{ color: '#aaa' }}>
               <ReactTimeago date={date} minPeriod={30} /> | @{username}
            </Typography>
         }
         style={{ paddingLeft: 0 }}
         action={<BlogAction blogId={id} />}
      />
   );
}
