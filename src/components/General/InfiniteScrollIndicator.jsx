import { LinearProgress } from '@material-ui/core';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import React from 'react';

export function InfiniteScrollIndicator({ fetching, fetchNext, hasNext }) {
   const loadMoreButtonRef = React.useRef();

   useIntersectionObserver({
      target: loadMoreButtonRef,
      onIntersect: fetchNext,
      enabled: hasNext,
   });

   // return <div ref={loadMoreButtonRef}>{fetching && <LinearProgress />}</div>;
   return (
      <div className="asd">
         <div ref={loadMoreButtonRef}>{fetching && <LinearProgress />}</div>
      </div>
   );
}
