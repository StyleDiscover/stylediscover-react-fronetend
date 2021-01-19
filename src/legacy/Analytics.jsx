import React, { useState, useEffect, useContext } from 'react';

//context and events
import { UserContext } from '../context/UserContext';
import { getSummaryViews, getDetailsViews } from '../events/AnalyticsEvents';

//MUI Imports
import {
   Container,
   Paper,
   Grid,
   Typography,
   makeStyles,
   List,
   Card,
   CardHeader,
   Divider,
} from '@material-ui/core';

//components
import MetricsCard from '../components/Analytics/MetricsCard';
import { setWishlist } from '../events/WishlistEvents';
import { AssignmentReturnRounded } from '@material-ui/icons';
import ComponentAnalyticsCard from '../components/Analytics/ComponentAnalyticsCard';

//use style
const useStyle = makeStyles({
   mainPaper: {
      padding: 20,
   },
});

export default function Analytics() {
   //use styles
   const classes = useStyle();

   //states
   const [analyticsSummary, setAnalyticsSummary] = useState(null);
   const [analyticsWishlistDetails, setAnalyticsWishlistDetails] = useState(
      null
   );
   const [analyticsBuyButtonDetails, setAnalyticsBuyButtonDetails] = useState(
      null
   );

   //use context
   const { user } = useContext(UserContext);

   //use effect
   useEffect(() => {
      if (user.userData.username) {
         getSummaryData();
         getDetailsData();
      }
   }, [user.userData]);

   //functions to get data
   const getSummaryData = async () => {
      const weekRange = getDateRange(7);
      const from = `${weekRange.year}-${weekRange.month}-01`;
      const to = weekRange.to;
      const summaryData = await getSummaryViews(from, to, user.userData.id);
      setAnalyticsSummary(summaryData);
   };

   const getDetailsData = async () => {
      var sortedWishlistArray = [];
      var sortedBuyButtonArray = [];

      const weekRange = getDateRange(7);
      const from = `${weekRange.year}-${weekRange.month}-01`;
      const to = weekRange.to;
      const detailsData = await getDetailsViews(from, to, user.userData.id);

      if (detailsData.data) {
         if (Object.keys(detailsData.data) !== 0) {
            if (detailsData.data.add_wishlist) {
               if (Object.keys(detailsData.data.add_wishlist).length !== 0) {
                  const sortedComponentList = Object.keys(
                     detailsData.data.add_wishlist
                  ).sort(function (a, b) {
                     return -(
                        detailsData.data.add_wishlist[b] -
                        detailsData.data.add_wishlist[a]
                     );
                  });
                  sortedComponentList.forEach((x) => {
                     sortedWishlistArray = [
                        [x, detailsData.data.add_wishlist[x]],
                        ...sortedWishlistArray,
                     ];
                  });

                  setAnalyticsWishlistDetails(sortedWishlistArray.slice(0, 3));
               }
            }

            if (detailsData.data.buy_button) {
               if (Object.keys(detailsData.data.buy_button).length !== 0) {
                  const sortedComponentList = Object.keys(
                     detailsData.data.buy_button
                  ).sort(function (a, b) {
                     return -(
                        detailsData.data.buy_button[b] -
                        detailsData.data.buy_button[a]
                     );
                  });
                  sortedComponentList.forEach((x) => {
                     sortedBuyButtonArray = [
                        [x, detailsData.data.buy_button[x]],
                        ...sortedBuyButtonArray,
                     ];
                  });

                  setAnalyticsBuyButtonDetails(
                     sortedBuyButtonArray.slice(0, 3)
                  );
               }
            }
         }
      }
   };

   //get date from now to x days ago
   const getDateRange = (days) => {
      var date = new Date();
      var last = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
      return {
         from: last.toISOString().slice(0, 10),
         to: date.toISOString().slice(0, 10),
         month:
            date.getMonth() + 1 < 10
               ? '0' + (date.getMonth() + 1).toString()
               : (date.getMonth() + 1).toString(),
         year: date.getFullYear(),
      };
   };

   return (
      <div className="margin-top-80">
         {user.userData.username &&
            analyticsSummary &&
            analyticsSummary.responseStatus === 'SUCCESS' &&
            user.userData.account_type !== 'PR' && (
               <Container maxWidth="lg">
                  <Typography variant="h4">Analytics</Typography>
                  <Grid container={true} spacing={3} style={{ marginTop: 25 }}>
                     <Grid
                        item={true}
                        xs={12}
                        sm={6}
                        md={4}
                        style={{ margin: 'auto' }}
                     >
                        <MetricsCard
                           title="Total Views This Month"
                           data={analyticsSummary.data.view}
                           unit="Views"
                        />
                     </Grid>
                     <Grid
                        item={true}
                        xs={12}
                        sm={6}
                        md={4}
                        style={{ margin: 'auto' }}
                     >
                        <MetricsCard
                           title="Total Items Wishlisted This Month"
                           data={analyticsSummary.data.add_wishlist}
                           unit="Wishlists"
                        />
                     </Grid>
                     <Grid
                        item={true}
                        xs={12}
                        sm={6}
                        md={4}
                        style={{ margin: 'auto' }}
                     >
                        <MetricsCard
                           title="Total Buy Button Clicked This Month"
                           data={analyticsSummary.data.buy_button}
                           unit="Clicks"
                        />
                     </Grid>
                  </Grid>
               </Container>
            )}
         {user.userData.username &&
            analyticsSummary &&
            analyticsSummary.responseStatus !== 'SUCCESS' && (
               <Container maxWidth="lg">
                  <Paper className={classes.mainPaper}>
                     <Typography variant="body1" align="center">
                        An error occured while getting your data :( <br />{' '}
                        please try again later.
                     </Typography>
                  </Paper>
               </Container>
            )}
         {user.userData.username &&
            (analyticsWishlistDetails || analyticsBuyButtonDetails) &&
            user.userData.account_type !== 'PR' && (
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
                                       Top {analyticsWishlistDetails.length}{' '}
                                       Wishlisted Items
                                    </Typography>
                                 }
                              ></CardHeader>
                              <Divider />
                              <List>
                                 {analyticsWishlistDetails.map(
                                    (componentPair) => (
                                       <ComponentAnalyticsCard
                                          componentId={componentPair[0]}
                                          metrics={componentPair[1]}
                                          key={componentPair[0]}
                                       />
                                    )
                                 )}
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
                                       Top {analyticsBuyButtonDetails.length}{' '}
                                       Buy Buttons Clicked
                                    </Typography>
                                 }
                              ></CardHeader>
                              <Divider />
                              <List>
                                 {analyticsBuyButtonDetails.map(
                                    (componentPair) => (
                                       <ComponentAnalyticsCard
                                          componentId={componentPair[0]}
                                          metrics={componentPair[1]}
                                          key={componentPair[0]}
                                       />
                                    )
                                 )}
                              </List>
                           </Card>
                        </Grid>
                     )}
                  </Grid>
               </Container>
            )}
         {user.userData.username && user.userData.account_type === 'PR' && (
            <Container maxWidth="lg">
               <Paper className={classes.mainPaper}>
                  <Typography variant="body1" align="center">
                     You are not authorized to access this page.
                  </Typography>
               </Paper>
            </Container>
         )}
      </div>
   );
}
