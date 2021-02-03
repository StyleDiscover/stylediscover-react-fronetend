import { Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react';

export function MenuList({ anchor, handleClose, data }) {
   return (
      <Menu
         id="menuList"
         anchorEl={anchor}
         keepMounted={true}
         open={Boolean(anchor)}
         onClose={handleClose}
      >
         {data?.map((menuItem) => {
            return (
               menuItem.condition && (
                  <MenuItem
                     onClick={menuItem?.action}
                     disabled={menuItem?.disabled}
                  >
                     <Typography variant="body1" style={menuItem?.textStyle}>
                        {menuItem?.text}
                     </Typography>
                  </MenuItem>
               )
            );
         })}
      </Menu>
   );
}
