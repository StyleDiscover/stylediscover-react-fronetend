// react imports
import React from 'react';

//MUI imports
import { Container, Typography, Grid } from '@material-ui/core';
import InfluencerGallery from '../../components/Static/InfluencerGallery';

//component import
import { GoBackButton } from 'components';

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
      // 'newaccuser',
      // 'deepak',
      // 'deepak',
      // 'deepak',
      // 'deepak',
      // 'deepak',
   ];

   return (
      <div className="margin-top-80">
         <Container maxWidth="lg">
            <GoBackButton />
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
