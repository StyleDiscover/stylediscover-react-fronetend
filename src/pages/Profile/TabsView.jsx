import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';

export default function TabsView({ data }) {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Container maxWidth="lg" style={{ margin: '0px auto', padding: 0 }}>
         <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
         >
            {data.map((tab) => (
               <Tab label={tab.name} />
            ))}
         </Tabs>
         <SwipeableViews index={value}>
            {data.map((tab) => data.indexOf(tab) === value && tab.content)}
         </SwipeableViews>
      </Container>
   );
}
