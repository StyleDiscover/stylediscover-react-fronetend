import React from 'react';

//MUI Imports
import {
   Divider,
   List,
   Grid,
   Card,
   CardHeader,
   Typography,
   Container,
} from '@material-ui/core';

//import components
import { AnalyticsComponentList as ComponentAnalyticsCard } from 'components';

export default function AnalyticsDetailsView({
   analyticsBuyButtonDetails,
   analyticsWishlistDetails,
}) {
   return (
      <Container maxWidth="lg" style={{ marginTop: 25 }}>
         <Grid container={true} spacing={3}>
            {analyticsWishlistDetails && (
               <Grid
                  item={true}
                  md={5}
                  sm={6}
                  xs={12}
                  style={{ margin: '0px auto' }}
               >
                  <Card elevation={5} style={{ borderRadius: 10 }}>
                     <CardHeader
                        title={
                           <Typography style={{ fontSize: 20 }}>
                              Top {analyticsWishlistDetails.length} Wishlisted
                              Items
                           </Typography>
                        }
                     ></CardHeader>
                     <Divider />
                     <List>
                        {analyticsWishlistDetails.map((componentPair) => (
                           <ComponentAnalyticsCard
                              componentId={componentPair[0]}
                              metrics={componentPair[1]}
                              key={componentPair[0]}
                           />
                        ))}
                     </List>
                  </Card>
               </Grid>
            )}
            {analyticsBuyButtonDetails && (
               <Grid
                  item={true}
                  md={5}
                  sm={6}
                  xs={12}
                  style={{ margin: '0px auto' }}
               >
                  <Card elevation={5} style={{ borderRadius: 10 }}>
                     <CardHeader
                        title={
                           <Typography style={{ fontSize: 20 }}>
                              Top {analyticsBuyButtonDetails.length} Buy Buttons
                              Clicked
                           </Typography>
                        }
                     ></CardHeader>
                     <Divider />
                     <List>
                        {analyticsBuyButtonDetails.map((componentPair) => (
                           <ComponentAnalyticsCard
                              componentId={componentPair[0]}
                              metrics={componentPair[1]}
                              key={componentPair[0]}
                           />
                        ))}
                     </List>
                  </Card>
               </Grid>
            )}
         </Grid>
      </Container>
   );
}
