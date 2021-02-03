//react imports
import React, { useState, useEffect } from 'react';

//MUI imports
import { Card, Grid } from '@material-ui/core';

//hook
import { useGetPostId } from 'hooks';

//context and events imports
import { sendPageViewAnalytics } from 'events/AnalyticsEvents'; //analytics events
import PostPageHeaderView from './PostPageHeaderView';
import PostPageMediaView from './PostPageMediaView';
import PostPageContentView from './PostPageContentView';

export function PostPageMainPostContainer({ id }) {
   //react-query query
   const { data: mainPostData, status: mainPostStatus } = useGetPostId(id);

   //use effect
   useEffect(() => {
      if ((mainPostData?.user_id, mainPostData?.id)) {
         sendPageViewAnalytics(mainPostData?.user_id, mainPostData?.id);
      }
   }, [mainPostData?.user_id, mainPostData?.id]);

   return (
      <div style={{ marginBottom: 25 }}>
         {mainPostStatus === 'success' && (
            <Card>
               <PostPageHeaderView mainPostData={mainPostData} />

               <Grid container={true} spacing={2}>
                  <PostPageMediaView mainPostData={mainPostData} />
                  <PostPageContentView mainPostData={mainPostData} />
               </Grid>
            </Card>
         )}
      </div>
   );
}
