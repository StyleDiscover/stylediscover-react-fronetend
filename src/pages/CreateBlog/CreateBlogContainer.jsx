import React from 'react';

//MUI Imports
import { Container } from '@material-ui/core';
import CreateBlogFormView from './CreateBlogFormView';
import { usePostBlog } from 'hooks';
import { useHistory } from 'react-router-dom';
import { BLOGS } from 'navigation/Constants';

export function CreateBlogContainer() {
   const { mutate: postBlog, status: blogStatus } = usePostBlog();

   const history = useHistory();

   const handleSubmit = (values) => {
      const blogData = new FormData();
      blogData.append('title', values.title);
      blogData.append('subtitle', values.subtitle);
      blogData.append('body', values.body);

      if (values.cover) {
         if (values.cover.size / (1024 * 1024) < 50) {
            if (values.cover.type.startsWith('image')) {
               blogData.append('cover_image', values.cover);
               postBlog(
                  { blogData: blogData },
                  {
                     onSuccess: () => history.push(BLOGS),
                  }
               );
            } else {
               window.alert('Please upload an image');
            }
         } else {
            window.alert('File Size Exceeds 50 MB.');
         }
      } else {
         postBlog(
            { blogData: blogData },
            {
               onSuccess: () => history.push(BLOGS),
            }
         );
      }
   };

   return (
      <Container maxWidth="lg" className="margin-top-80">
         <CreateBlogFormView handleSubmit={handleSubmit} status={blogStatus} />
      </Container>
   );
}
