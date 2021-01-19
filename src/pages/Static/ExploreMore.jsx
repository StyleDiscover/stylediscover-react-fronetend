// react imports
import React from 'react';
import { Link } from 'react-router-dom';

//MUI imports
import {
   Container,
   Paper,
   CardMedia,
   Typography,
   Link as MUILink,
   Grid,
} from '@material-ui/core';
import InfluencerGallery from '../../components/Static/InfluencerGallery';

export function ExploreMore() {
   var userList = [
      'shaniceshrestha',
      'urmidaga',
      'thedramaticdiva',
      'sheenasherwani',
      'limitless_adventurer',
      'thestylechair',
      'cosmolifestyler',
      'stylecodebyharshal',
      'reneethereborn',
      'devika_vaid',
      'littlesassyrealclassy',
      'discoverherstyle',
      // 'deepak',
      // 'deepak',
      // 'deepak',
      // 'deepak',
      // 'deepak',
      // 'deepak',
      // 'deepak',
   ];

   return (
      <div className="margin-top-80">
         <Container maxWidth="lg">
            <Container maxWidth="lg" style={{ margin: '40px auto' }}>
               <Typography variant="h5">
                  If it's in trend, you’ll find it here.
               </Typography>
               <Typography variant="body1">
                  Check out the latest styles by our top influencers!
               </Typography>
            </Container>
            <Grid container={true} spacing={3}>
               {userList.map((username) => (
                  <InfluencerGallery
                     username={username}
                     key={userList.indexOf(username)}
                  />
               ))}
            </Grid>
         </Container>
      </div>
   );
}
