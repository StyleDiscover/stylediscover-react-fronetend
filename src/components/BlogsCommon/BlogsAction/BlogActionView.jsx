import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import React from 'react';

export default function BlogActionView({ handleAction }) {
   return (
      <div>
         <IconButton
            style={{ margin: '0px 5px' }}
            aria-controls="edit-menu"
            aria-haspopup="true"
            onClick={handleAction}
         >
            <MoreVert />
         </IconButton>
      </div>
   );
}
