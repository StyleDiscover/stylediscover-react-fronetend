import React from 'react';
import { useGetBlogId } from 'hooks';
import { Card, CardActionArea } from '@material-ui/core';
import BlogCardMedia from './BlogCardMedia';
import BlogCardContent from './BlogCardContent';
import BlogCardHeader from './BlogCardHeader';
import { AES } from 'crypto-js';
import { BLOG_ENCRYPTION_KEY } from 'config/Constants';
import { useHistory } from 'react-router-dom';
import { BLOG_PAGE_BASE } from 'navigation/Constants';

export function BlogCardContainer({ id }) {
   const { data: blogData, status: blogStatus } = useGetBlogId(id);
   const encryptedBlogId = AES.encrypt(`${id}`, BLOG_ENCRYPTION_KEY)
      .toString()
      .replace(/\//g, '*');

   const history = useHistory();

   return (
      blogStatus === 'success' && (
         <Card>
            <CardActionArea
               onClick={(event) => {
                  event.stopPropagation();
                  history.push(`${BLOG_PAGE_BASE}/${encryptedBlogId}`);
               }}
            >
               {blogData?.cover_image && (
                  <BlogCardMedia cover={blogData?.cover_image} />
               )}
               <BlogCardHeader data={blogData} />
               <BlogCardContent data={blogData} />
            </CardActionArea>
         </Card>
      )
   );
}
