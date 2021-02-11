import React from 'react';

//MUI imports
import { Grid } from '@material-ui/core';

//component imports
import { NonEditableMainPost } from 'components';
import { InfiniteScrollIndicator } from 'components/General/InfiniteScrollIndicator';

export default function UserPagePostsView({
   postData,
   fetchingMorePost,
   fetchNextPost,
   hasNextPost,
}) {
   return (
      <Grid container={true} spacing={2}>
         {postData.map((page, i) => (
            <React.Fragment key={i}>
               {page.results.map((post) => {
                  return (
                     <Grid item={true} xs={12} sm={6} lg={4} key={post.id}>
                        <NonEditableMainPost id={post.id} />
                     </Grid>
                  );
               })}
            </React.Fragment>
         ))}
         <InfiniteScrollIndicator
            fetching={fetchingMorePost}
            hasNext={hasNextPost}
            fetchNext={fetchNextPost}
         />
      </Grid>
   );
}
