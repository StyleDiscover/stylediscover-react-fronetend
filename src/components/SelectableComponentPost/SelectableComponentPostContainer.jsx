//react imports
import React, { useContext } from 'react';

//hooks
import { useGetComponentId } from 'hooks';

//context and events
import { MyComponentsContext } from 'context/MyComponentContext';
import SelectableComponentView from './SelectableComponentView';

export function SelectableComponentPostContainer({ componentId }) {
   //use context
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );
   const {
      data: componentPostData,
      status: componentPostStatus,
   } = useGetComponentId(componentId);

   const handleRemove = async (event) => {
      event.stopPropagation();
      componentDispatch({ type: 'REMOVE_COMPONENT', id: componentId });
   };

   return (
      <div>
         {componentPostStatus === 'success' && (
            <SelectableComponentView
               handleRemove={handleRemove}
               myComponentData={myComponentData}
               componentId={componentId}
               componentPostData={componentPostData}
            />
         )}
      </div>
   );
}
