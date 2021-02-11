import {
   Avatar,
   Divider,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   makeStyles,
   Typography,
} from '@material-ui/core';
import {
   Add,
   CollectionsBookmark,
   Favorite,
   Info,
   InsertChartOutlined,
   Person,
   PowerSettingsNew,
   Search,
   SupervisorAccount,
} from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

//use style
const useStyle = makeStyles({
   list: {
      width: 250,
   },
   iconStyle: {
      fontSize: 25,
   },
});

export default function NavigationBarDrawerList({
   user,
   handleLogout,
   toggleDrawer,
}) {
   //use styles
   const classes = useStyle();
   return (
      <div
         className={classes.list}
         role="presentation"
         onClick={toggleDrawer(false)}
         onKeyDown={toggleDrawer(false)}
      >
         {!user.isAuthenticated && (
            <List>
               <ListItem button key="login" component={Link} to="/login">
                  <ListItemIcon>
                     {' '}
                     <Person />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
               </ListItem>
               <ListItem button key="signup" component={Link} to="/signup">
                  <ListItemIcon>
                     {' '}
                     <Add />
                  </ListItemIcon>
                  <ListItemText primary="Signup" />
               </ListItem>
            </List>
         )}
         {user.isAuthenticated && (
            <List>
               <ListItem button key="login" component={Link} to="/profile">
                  <ListItemIcon>
                     {user.userData.profile_picture ? (
                        <Avatar
                           src={user.userData.profile_picture}
                           alt={
                              user.userData.name !== ''
                                 ? user.userData.name
                                 : user.userData.username
                           }
                           style={{ height: 25, width: 25 }}
                        ></Avatar>
                     ) : (
                        <Avatar
                           alt={
                              user.userData.name !== ''
                                 ? user.userData.name
                                 : user.userData.username
                           }
                           style={{ height: 25, width: 25 }}
                        ></Avatar>
                     )}
                  </ListItemIcon>
                  <ListItemText
                     primary={
                        user.userData.name !== ''
                           ? user.userData.name
                           : user.userData.username
                     }
                  />
               </ListItem>
               <ListItem button key="wishlist" component={Link} to="/create">
                  <ListItemIcon>
                     {' '}
                     <Add className={classes.iconStyle} />
                  </ListItemIcon>
                  <ListItemText primary="Create" />
               </ListItem>
               <ListItem button key="wishlist" component={Link} to="/wishlist">
                  <ListItemIcon>
                     {' '}
                     <Favorite />
                  </ListItemIcon>
                  <ListItemText primary="Wishlist" />
               </ListItem>
               <ListItem
                  button
                  key="collections"
                  component={Link}
                  to="/mycollection"
               >
                  <ListItemIcon>
                     {' '}
                     <CollectionsBookmark />
                  </ListItemIcon>
                  <ListItemText primary="My Collections" />
               </ListItem>
               {user.userData.account_type !== 'PR' && (
                  <ListItem
                     button
                     key="analytics"
                     component={Link}
                     to="/analytics"
                  >
                     <ListItemIcon>
                        {' '}
                        <InsertChartOutlined />
                     </ListItemIcon>
                     <ListItemText primary="Analytics" />
                  </ListItem>
               )}
               <ListItem button key="explore" component={Link} to="/sd/explore">
                  <ListItemIcon>
                     {' '}
                     <Search />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
               </ListItem>
            </List>
         )}
         {user.isAuthenticated && user.userData.account_type === 'AD' && (
            <>
               <Divider />
               <ListItem>
                  <Typography>Admin</Typography>
               </ListItem>
               <List>
                  <ListItem
                     button
                     key="about us"
                     component={Link}
                     to="/sd/admin/loginasuser"
                  >
                     <ListItemIcon>
                        {' '}
                        <SupervisorAccount />
                     </ListItemIcon>
                     <ListItemText primary="Login As User" />
                  </ListItem>
               </List>
            </>
         )}
         <Divider />
         <List>
            <ListItem button key="about us" component={Link} to="/sd/aboutus">
               <ListItemIcon>
                  {' '}
                  <Info />
               </ListItemIcon>
               <ListItemText primary="About Us" />
            </ListItem>
            {user.isAuthenticated && (
               <ListItem button key="logout" onClick={handleLogout}>
                  <ListItemIcon>
                     {' '}
                     <PowerSettingsNew />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
               </ListItem>
            )}
         </List>
      </div>
   );
}
