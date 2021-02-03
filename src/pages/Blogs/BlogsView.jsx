import { Grid } from '@material-ui/core';
import { BlogCard } from 'components';
import { InfiniteScrollIndicator } from 'components/General/InfiniteScrollIndicator';
import React from 'react';

export default function BlogsView({
   blogData,
   hasNextBlog,
   fetchNextBlog,
   fetchingMoreblog,
}) {
   return (
      <Grid container spacing={2}>
         {blogData.pages.map((page, i) => (
            <React.Fragment key={i}>
               {page.results.map((blog) => {
                  return (
                     <Grid item={true} xs={12} sm={6} lg={4} key={blog.id}>
                        <BlogCard id={blog.id} />
                     </Grid>
                  );
               })}
            </React.Fragment>
         ))}
         <InfiniteScrollIndicator
            hasNext={hasNextBlog}
            fetchNext={fetchNextBlog}
            fetching={fetchingMoreblog}
         />
      </Grid>
   );
}
