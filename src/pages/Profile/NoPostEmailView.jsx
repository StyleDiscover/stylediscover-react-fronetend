import React from 'react';
import { Link } from 'react-router-dom';

//navigation constant imports
import { ANALYTICS, WISHLIST, CREATE } from 'navigation/Constants';

//MUI imports
import {
   Typography,
   makeStyles,
   Link as MUILink,
   Container,
   Paper,
   Grid,
} from '@material-ui/core';

//import Icons
import {
   FilterNoneRounded,
   Favorite,
   PollOutlined,
   AddAPhotoOutlined,
} from '@material-ui/icons';

//use styles
const useStyles = makeStyles({
   customNoPostMessage: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
      textAlign: 'center',
   },
});

export default function NoPostEmailView() {
   //classes usestyle
   const classes = useStyles();

   return (
      <div>
         <Typography className={classes.customNoPostMessage} variant="body2">
            We are adding your last five posts!
            <br />
            <br />
            {/* <br />
            Sit back and relax
            <br />
            or
            <br />
            <MUILink component={Link} to={CREATE}>
               <b>Create a post now!</b>
            </MUILink> */}
         </Typography>
         <Container maxWidth="sm">
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
                        to={CREATE}
                        style={{ color: '#666666' }}
                     >
                        <Typography align="center">
                           <AddAPhotoOutlined style={{ fontSize: 40 }} />
                        </Typography>
                        <Typography align="center" variant="body1">
                           <b>Create</b>
                        </Typography>
                        <Typography
                           align="center"
                           variant="body2"
                           style={{ marginTop: 5 }}
                        >
                           Create your StyleDiscover feed now!
                        </Typography>
                     </MUILink>
                  </Grid>
                  <Grid
                     item={true}
                     xs={12}
                     sm={4}
                     style={{ margin: '20px auto' }}
                  >
                     <div
                        // component={Link}
                        // to={WISHLIST}
                        style={{ color: '#666666' }}
                     >
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
