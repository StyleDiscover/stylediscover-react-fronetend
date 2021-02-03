import React from 'react';
import { Link } from 'react-router-dom';

//navigation consts import
import { ANALYTICS } from 'navigation/Constants';

//MUI imports
import {
   Typography,
   makeStyles,
   Container,
   Paper,
   Grid,
   Link as MUILink,
} from '@material-ui/core';

//import Icons
import { FilterNoneRounded, PollOutlined, Instagram } from '@material-ui/icons';

//use styles
const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
   customCreateButton: {
      margin: 'auto',
      display: 'flex',
      padding: '10px 15px',
      boxShadow: 'none',
   },
   customProgress: {
      marginLeft: 10,
   },
});

export default function NoPostNoEmailView({
   handleSentInstaEmail,
   accountType,
}) {
   //classes usestyle
   const classes = useStyles();

   return (
      <div>
         <Container maxWidth="sm">
            {accountType !== 'BR' ? (
               <Typography
                  variant="subtitle2"
                  className={classes.customNoPostMessage}
               >
                  <b>Congratulations!</b> You’ve taken the first step to
                  becoming a unique StyleDiscover influencer - the only ones in
                  the country who not only inspire but also help their audience
                  shop! Let's get you started.
               </Typography>
            ) : (
               <Typography
                  variant="subtitle2"
                  className={classes.customNoPostMessage}
               >
                  Come create your Instagram shoppable storefront at{' '}
                  <b>Stylediscover</b>!
               </Typography>
            )}
            <br />
            <Paper variant="outlined" style={{ borderRadius: 5, padding: 25 }}>
               <Grid container={true} spacing={2}>
                  <Grid
                     item={true}
                     xs={12}
                     sm={4}
                     style={{ margin: '20px auto' }}
                  >
                     <MUILink
                        component={Link}
                        onClick={handleSentInstaEmail}
                        style={{ color: '#666666' }}
                     >
                        <Typography align="center">
                           <Instagram style={{ fontSize: 40 }} />
                        </Typography>
                        <Typography align="center" variant="body1">
                           <b>Import</b>
                        </Typography>
                        <Typography
                           align="center"
                           variant="body2"
                           style={{ marginTop: 5 }}
                        >
                           Your latest 5 pictures from Instagram
                        </Typography>
                     </MUILink>
                  </Grid>
                  <Grid
                     item={true}
                     xs={12}
                     sm={4}
                     style={{ margin: '20px auto' }}
                  >
                     <div style={{ color: '#666666' }}>
                        <Typography align="center">
                           <FilterNoneRounded style={{ fontSize: 40 }} />
                        </Typography>
                        <Typography align="center" variant="body1">
                           <b>Drive Traffic</b>
                        </Typography>
                        <Typography
                           align="center"
                           variant="body2"
                           style={{ marginTop: 5 }}
                        >
                           To your page!
                           <br />
                           Copy paste the above link in your Insta bio
                        </Typography>
                     </div>
                  </Grid>
                  <Grid
                     item={true}
                     xs={12}
                     sm={4}
                     style={{ margin: '20px auto' }}
                  >
                     <MUILink
                        component={Link}
                        to={ANALYTICS}
                        style={{ color: '#666666' }}
                     >
                        <Typography align="center">
                           <PollOutlined style={{ fontSize: 40 }} />
                        </Typography>
                        <Typography align="center" variant="body1">
                           <b>Get Insights</b>
                        </Typography>
                        <Typography
                           align="center"
                           variant="body2"
                           style={{ marginTop: 5 }}
                        >
                           Check how many folks are engaging with your content
                        </Typography>
                     </MUILink>
                  </Grid>
               </Grid>
            </Paper>
         </Container>
      </div>
   );
}
