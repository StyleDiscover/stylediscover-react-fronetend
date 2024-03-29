//react imports
import React, { useState, useEffect, Suspense } from 'react';

//component events import
import { getComponentById } from 'events/MainPostEvents';
const AnalyticsComponentListView = React.lazy(() =>
   import('./AnalyticsComponentListView')
);

export function AnalyticsComponentListContainer({ componentId, metrics }) {
   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag

   //GUnctions
   //dialog functions
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   useEffect(() => {
      getComponentById(componentId).then((data) => setComponentPostData(data));
   }, []);

   return (
      <div>
         <Suspense fallback={<>Loading...</>}>
            <AnalyticsComponentListView
               componentPostData={componentPostData}
               handleClickOpen={handleClickOpen}
               handleClose={handleClose}
               open={open}
               metrics={metrics}
            />
         </Suspense>
      </div>
   );
}
