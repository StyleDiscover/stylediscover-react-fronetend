import React from 'react';

//MUI imports
import { Menu, MenuItem, Typography } from '@material-ui/core';

export default function EditMenuView({
   editMenu,
   closeEditMenu,
   handleChangeDialogOpen,
   handleAddDialogOpen,
   handleDeleteDialogOpen,
   mainPostData,
   handleEditCaptionOpen,
}) {
   return (
      <div>
         <Menu
            id="edit-menu"
            anchorEl={editMenu}
            keepMounted={true}
            open={Boolean(editMenu)}
            onClose={closeEditMenu}
         >
            <MenuItem onClick={handleChangeDialogOpen}>
               <Typography variant="body1">
                  Change{' '}
                  {mainPostData &&
                     (mainPostData.media_type === 'VD' ? 'Video' : 'Image')}
               </Typography>
            </MenuItem>
            <MenuItem
               onClick={handleAddDialogOpen}
               disabled={
                  mainPostData
                     ? mainPostData.component_posts.length >= 8
                     : false
               }
            >
               <Typography variant="body1">Add Components</Typography>
            </MenuItem>
            <MenuItem onClick={handleEditCaptionOpen}>
               <Typography variant="body1">Edit Caption</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteDialogOpen}>
               <Typography variant="body1" style={{ color: 'red' }}>
                  Delete
               </Typography>
            </MenuItem>
         </Menu>
      </div>
   );
}
