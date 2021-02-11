import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

export function CustomTabsContainer({ data }) {
   const history = useHistory();
   const { page } = useParams();

   const tabNameToIndex = { ...data.data.map((tab) => tab.route) };

   var indexToTabName = Object.create({});

   data.data.forEach((tab) => {
      var key = tab.route;
      indexToTabName[key] = data.data.indexOf(tab);
   });

   const [selectedTab, setSelectedTab] = React.useState(
      page ? indexToTabName[page] : 0
   );

   const handleChange = (event, newValue) => {
      if (tabNameToIndex[newValue] !== '') {
         history.push(`${data.baseRoute}/${tabNameToIndex[newValue]}`);
      } else {
         history.push(`${data.baseRoute}`);
      }

      setSelectedTab(newValue);
   };

   return (
      <>
         <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            style={{
               marginBottom: 25,
            }}
         >
            {data?.data?.map((tabData) => (
               <Tab label={tabData?.label} />
            ))}
         </Tabs>
         {data?.data[selectedTab]?.component}
         {/* {selectedTab === 0 && <About />}
      {selectedTab === 1 && <Contact />} */}
      </>
   );
}
