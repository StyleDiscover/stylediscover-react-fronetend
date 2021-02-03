import React from 'react';
import { Container, LinearProgress, Typography } from '@material-ui/core';
import { useGetAllBlogs } from 'hooks';
import BlogsView from './BlogsView';

export function BlogsContainer() {
   const {
      data: blogData,
      fetchNextPage: fetchNextBlog,
      hasNextPage: hasNextBlog,
      isFetchingNextPage: fetchingMoreBlog,
      status: blogStatus,
   } = useGetAllBlogs();

   return (
      <Container className="margin-top-80" maxWidth="lg">
         {blogStatus === 'loading' && <LinearProgress />}
         {blogStatus === 'error' && (
            <Typography>An error occured while fetching blogs</Typography>
         )}
         {blogStatus === 'success' && (
            <BlogsView
               blogData={blogData}
               fetchNextBlog={fetchNextBlog}
               hasNextBlog={hasNextBlog}
               fetchingMoreBlog={fetchingMoreBlog}
            />
         )}
      </Container>
   );
}
