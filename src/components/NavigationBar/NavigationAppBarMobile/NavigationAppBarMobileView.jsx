import {
   AppBar,
   Container,
   IconButton,
   makeStyles,
   Slide,
   Toolbar,
   Typography,
   useScrollTrigger,
} from '@material-ui/core';
import { Menu, Search } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

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

//use style
const useStyle = makeStyles({
   logo: {
      fontFamily: 'Megrim',
      color: 'black',
      fontSize: '1.8em',
      textDecoration: 'None',
   },
});

export default function NavigationAppBarMobileView({ props }) {
   //use styles
   const classes = useStyle();
   return (
      <HideOnScroll {...props}>
         <AppBar
            color="inherit"
            // style={{ background: 'rgba(255,255,255,0.5)' }}
         >
            <Container maxWidth="md" component="div" style={{ padding: 0 }}>
               <Toolbar>
                  <div style={{ flexGrow: 1 }}></div>
                  <Typography
                     component={Link}
                     to="/"
                     style={{ WebkitTapHighlightColor: 'transparent' }}
                     className={classes.logo}
                     align="center"
                  >
                     StyleDiscover
                  </Typography>
                  <div style={{ flexGrow: 1 }}></div>
                  {/* <div>
                     <IconButton color="inherit">
                        <Search />
                     </IconButton>
                  </div> */}
               </Toolbar>
            </Container>
         </AppBar>
      </HideOnScroll>
   );
}
