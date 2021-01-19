//react imports
import React, { useState, useEffect, useContext } from 'react';

//for history
import { useHistory } from 'react-router-dom';

//context and events
import { MyComponentsContext } from 'context/MyComponentContext';
import { getComponentById } from '../../events/MainPostEvents';
import SelectableComponentView from './SelectableComponentView';

export function SelectableComponentPostContainer({ componentId }) {
   //use history
   const history = useHistory();

   //states
   const [componentPostData, setComponentPostData] = useState(); //component post data
   const [open, setOpen] = useState(false); //buy dialog open flag

   //use context
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

   useEffect(() => {
      getComponentById(componentId).then((data) => setComponentPostData(data));
   }, []);

   //GUnctions
   //dialog functions
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleRemove = async (event) => {
      event.stopPropagation();
      componentDispatch({ type: 'REMOVE_COMPONENT', id: componentId });
   };

   return (
      <div>
         {componentPostData && (
            <SelectableComponentView
               handleClickOpen={handleClickOpen}
               handleRemove={handleRemove}
               myComponentData={myComponentData}
               componentId={componentId}
               componentPostData={componentPostData}
            />
         )}
      </div>
   );
}
