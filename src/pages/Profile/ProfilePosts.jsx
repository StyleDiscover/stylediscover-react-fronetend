import React from 'react';

import { LinearProgress, Grid } from '@material-ui/core';
import { loadable } from 'react-lazily/loadable';

import useIntersectionObserver from 'hooks/useIntersectionObserver';

const { EditableMainPost } = loadable(() => import('components'));

export default function ProfilePosts({
   fetchNextPost,
   hasNextPost,
   fetchingMorePost,
   postData,
}) {
   const loadMoreButtonRef = React.useRef();

   useIntersectionObserver({
      target: loadMoreButtonRef,
      onIntersect: fetchNextPost,
      enabled: hasNextPost,
   });

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
         <div ref={loadMoreButtonRef}>
            {fetchingMorePost && <LinearProgress />}
         </div>
      </Grid>
   );
}
