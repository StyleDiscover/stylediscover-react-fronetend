import { CardHeader, Typography } from '@material-ui/core';
import { BlogAction } from 'components';
import React from 'react';
import ReactTimeago from 'react-timeago';

export default function BlogCardHeader({ data }) {
   return (
      <CardHeader
         title={<Typography variant="body1">@{data.username}</Typography>}
         subheader={
            <Typography variant="body2" style={{ color: '#aaa' }}>
               <ReactTimeago date={data.created_at} minPeriod={30} />
            </Typography>
         }
         action={<BlogAction blogId={data.id} />}
      />
   );
}
