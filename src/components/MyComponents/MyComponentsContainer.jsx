//react imports
import React, { useState, useContext } from 'react';

//context and events imports
import { MyComponentsContext } from 'context/MyComponentContext';
import MyComponentsView from './MyComponentsView';

export function MyComponentsContainer() {
   //   use state
   const [selectedComponent, setSelectedComponent] = useState([]);

   //use context
   const { myComponentData, componentDispatch } = useContext(
      MyComponentsContext
   );

   //funtion

   const handleSelect = (component) => (event) => {
      event.preventDefault();
      if (!myComponentData.addComponents.includes(component)) {
         componentDispatch({
            type: 'ADD_COMPONENT',
            id: [component],
         });
         setSelectedComponent([...selectedComponent, component]);
      }
   };

   return (
      <div>
         <MyComponentsView
            selectedComponent={selectedComponent}
            myComponentData={myComponentData}
            handleSelect={handleSelect}
         />
      </div>
   );
}
