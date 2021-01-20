//react imports
import React, { useState, useEffect, useContext } from 'react';

//MUI imports
import { Card, Grid } from '@material-ui/core';

//context and events imports
import { MainPostContext } from 'context/MainPostContext';
import { getMainPostById } from 'events/MainPostEvents';
import { sendPageViewAnalytics } from 'events/AnalyticsEvents'; //analytics events
import PostPageHeaderView from './PostPageHeaderView';
import PostPageMediaView from './PostPageMediaView';
import PostPageContentView from './PostPageContentView';

export function PostPageMainPostContainer({ id }) {
   //use context
   const { mainPostDispatch } = useContext(MainPostContext);

   //states
   const [mainPostData, setMainPostData] = useState();

   //use effect
   useEffect(() => {
      getMainPostById(id, mainPostDispatch).then((data) => {
         setMainPostData(data);
         sendPageViewAnalytics(data.user_id, data.id);
      });
   }, []);

   return (
      <div style={{ marginBottom: 25 }}>
         {mainPostData && (
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
