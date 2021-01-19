import React from 'react';

//MUI Imports
import { Container, Typography, Grid } from '@material-ui/core';

//component imports
import { MetricsCard } from 'components';

export default function AnalyticsSummaryView({ analyticsSummary }) {
   return (
      <Container maxWidth="lg">
         <Typography variant="h4">Analytics</Typography>
         <Grid container={true} spacing={3} style={{ marginTop: 25 }}>
            <Grid item={true} xs={12} sm={6} md={4} style={{ margin: 'auto' }}>
               <MetricsCard
                  title="Total Views This Month"
                  data={analyticsSummary.data.view}
                  unit="Views"
               />
            </Grid>
            <Grid item={true} xs={12} sm={6} md={4} style={{ margin: 'auto' }}>
               <MetricsCard
                  title="Total Items Wishlisted This Month"
                  data={analyticsSummary.data.add_wishlist}
                  unit="Wishlists"
               />
            </Grid>
            <Grid item={true} xs={12} sm={6} md={4} style={{ margin: 'auto' }}>
               <MetricsCard
                  title="Total Buy Button Clicked This Month"
                  data={analyticsSummary.data.buy_button}
                  unit="Clicks"
               />
            </Grid>
         </Grid>
      </Container>
   );
}
