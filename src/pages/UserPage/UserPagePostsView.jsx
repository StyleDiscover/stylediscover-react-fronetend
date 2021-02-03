import React from 'react';

//MUI imports
import { Grid, LinearProgress } from '@material-ui/core';

//component imports
import { NonEditableMainPost } from 'components';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

export default function UserPagePostsView({
   postData,
   fetchingMorePost,
   fetchNextPost,
   hasNextPost,
}) {
   const loadMoreButtonRef = React.useRef();

   useIntersectionObserver({
      target: loadMoreButtonRef,
      onIntersect: fetchNextPost,
      enabled: hasNextPost,
   });

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
         <div ref={loadMoreButtonRef}>
            {fetchingMorePost && <LinearProgress />}
         </div>
      </Grid>
   );
}
