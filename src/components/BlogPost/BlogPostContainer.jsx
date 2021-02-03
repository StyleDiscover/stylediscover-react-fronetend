import { Container, LinearProgress } from '@material-ui/core';
import { useGetBlogId } from 'hooks';
import React from 'react';
import BlogPostMainView from './BlogPostMainView';

export function BlogPostContainer({ id }) {
   const { data: blogData, status: blogStatus } = useGetBlogId(id);

   return (
      <Container maxWidth="md" className="margin-top-80">
         {blogStatus === 'loading' && <LinearProgress />}
         {blogStatus === 'success' && <BlogPostMainView data={blogData} />}
      </Container>
   );
}
