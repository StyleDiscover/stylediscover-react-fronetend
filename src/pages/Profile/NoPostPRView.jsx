import React from 'react';
import { Link } from 'react-router-dom';

//navigation consts import
import { EXPLORE, CREATE, WISHLIST } from 'navigation/Constants';

//MUI imports
import {
   Container,
   Paper,
   Grid,
   Link as MUILink,
   Typography,
} from '@material-ui/core';

//MUI icons
import { Search, Favorite, AddAPhotoOutlined } from '@material-ui/icons';

export default function NoPostPRView() {
   return (
      <Container maxWidth="sm">
         <Paper variant="outlined" style={{ borderRadius: 5, padding: 25 }}>
            <Grid container={true} spacing={2}>
               <Grid item={true} xs={12} sm={4} style={{ margin: '20px auto' }}>
                  <MUILink
                     component={Link}
                     to={EXPLORE}
                     style={{ color: '#666666' }}
                  >
                     <Typography align="center">
                        <Search style={{ fontSize: 40 }} />
                     </Typography>
                     <Typography align="center" variant="body1">
                        <b>Shop</b>
                     </Typography>
                     <Typography
                        align="center"
                        variant="body2"
                        style={{ marginTop: 5 }}
                     >
                        Latest styles of top infuencers
                     </Typography>
                  </MUILink>
               </Grid>
               <Grid item={true} xs={12} sm={4} style={{ margin: '20px auto' }}>
                  <MUILink
                     component={Link}
                     to={WISHLIST}
                     style={{ color: '#666666' }}
                  >
                     <Typography align="center">
                        <Favorite style={{ fontSize: 40 }} />
                     </Typography>
                     <Typography align="center" variant="body1">
                        <b>Wishlist</b>
                     </Typography>
                     <Typography
                        align="center"
                        variant="body2"
                        style={{ marginTop: 5 }}
                     >
                        Create a wishlist from all your favorite websites in 1
                        place!
                     </Typography>
                  </MUILink>
               </Grid>
               <Grid item={true} xs={12} sm={4} style={{ margin: '20px auto' }}>
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
                        Create your own StyleDiscover feed and showoff your
                        personal style!
                     </Typography>
                  </MUILink>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}
