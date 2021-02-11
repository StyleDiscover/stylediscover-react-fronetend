import React from 'react';
import SOWHeroView from './SOWHeroView';
import SOWPage1 from './SOWPage1';
import SOWPage2 from './SOWPage2';

export default function SOWView() {
   return (
      <div>
         <SOWHeroView />
         <SOWPage1 />
         <SOWPage2 id={'demo'} />
      </div>
   );
}
