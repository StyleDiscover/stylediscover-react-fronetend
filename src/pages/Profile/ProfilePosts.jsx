import React from 'react';

import { Grid } from '@material-ui/core';
import { loadable } from 'react-lazily/loadable';

import { InfiniteScrollIndicator } from 'components/General/InfiniteScrollIndicator';

const { EditableMainPost } = loadable(() => import('components'));

export default function ProfilePosts({
   fetchNextPost,
   hasNextPost,
   fetchingMorePost,
   postData,
}) {
   return (
      <Grid container={true} spacing={2}>
         {postData.pages.map((page, i) => (
            <React.Fragment key={i}>
               {page.results.map((post) => {
                  return (
                     <Grid item={true} xs={12} sm={6} lg={4} key={post.id}>
                        <EditableMainPost id={post.id} />
                     </Grid>
                  );
               })}
            </React.Fragment>
         ))}
         <InfiniteScrollIndicator
            hasNext={hasNextPost}
            fetchNext={fetchNextPost}
            fetching={fetchingMorePost}
         />
      </Grid>
   );
}
