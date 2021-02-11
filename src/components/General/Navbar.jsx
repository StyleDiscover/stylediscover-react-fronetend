//react imports
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

//context and events
import { UserContext } from '../../context/UserContext';
import { MyComponentsContext } from '../../context/MyComponentContext';
import { WishlistContext } from '../../context/WishlistContext';
import { logout } from '../../events/UserEvents';

//MUI Core imports
import {
   AppBar,
   Toolbar,
   Container,
   IconButton,
   Avatar,
   Slide,
   SwipeableDrawer,
   useScrollTrigger,
   List,
   Divider,
   ListItem,
   makeStyles,
   ListItemIcon,
   ListItemText,
   Typography,
} from '@material-ui/core';

//MUI Icons Import
import {
   Person,
   PowerSettingsNew,
   Favorite,
   Menu,
   Add,
   Info,
   SupervisorAccount,
   CollectionsBookmark,
   InsertChartOutlined,
   Search,
} from '@material-ui/icons';

//use style
const useStyle = makeStyles({
   list: {
      width: 250,
   },
   logo: {
      fontFamily: 'Megrim',
      color: 'black',
      fontSize: '1.8em',
      textDecoration: 'None',
   },
   iconStyle: {
      fontSize: 25,
   },
});

//hide on scroll functions
function HideOnScroll(props) {
   const { children, window } = props;
   // Note that you normally won't need to set the window ref as useScrollTrigger
   // will default to window.
   // This is only being set here because the demo is in an iframe.
   const trigger = useScrollTrigger({ target: window });

   return (
      <Slide appear={false} direction="down" in={!trigger}>
         {children}
      </Slide>
   );
}

export default function Navbar(props) {
   // get user dispatch
   const { user, userDispatch } = useContext(UserContext);
   const { wishlistDispatch } = useContext(WishlistContext);
   const { componentDispatch } = useContext(MyComponentsContext);

   //states
   const [drawer, setDrawer] = useState(false);

   //use styles
   const classes = useStyle();

   //logout function
   const handleLogout = (event) => {
      const token = localStorage.AccessToken;
      logout(token, userDispatch, componentDispatch, wishlistDispatch);
   };

   //drawer toggle
   const toggleDrawer = (open) => (event) => {
      if (
         event &&
         event.type === 'keydown' &&
         (event.key === 'Tab' || event.key === 'Shift')
      ) {
         return;
      }
      setDrawer(open);
   };

   //drawer list
   const list = (anchor) => (
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

   return (
      <HideOnScroll {...props}>
         <AppBar
            color="inherit"
            // style={{ background: 'rgba(255,255,255,0.5)' }}
         >
            <Container maxWidth="md" component="div">
               <Toolbar>
                  <Typography
                     component={Link}
                     to="/"
                     style={{ WebkitTapHighlightColor: 'transparent' }}
                     className={classes.logo}
                  >
                     StyleDiscover
                  </Typography>
                  <div style={{ flexGrow: 1 }}></div>
                  <div>
                     <IconButton onClick={toggleDrawer(true)} color="inherit">
                        <Menu />
                     </IconButton>
                     <SwipeableDrawer
                        anchor="right"
                        open={drawer}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                     >
                        {list(drawer)}
                     </SwipeableDrawer>
                  </div>
               </Toolbar>
            </Container>
         </AppBar>
      </HideOnScroll>
   );
}
