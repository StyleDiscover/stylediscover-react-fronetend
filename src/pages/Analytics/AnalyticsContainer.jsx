import React, { useState, useEffect, useContext } from 'react';

//context and events
import { UserContext } from 'context/UserContext';
import { getSummaryViews, getDetailsViews } from 'events/AnalyticsEvents';

//components
import { GoBackButton } from 'components';
import AnalyticsSummaryView from './AnalyticsSummaryView';
import AnalyticsSummaryError from './AnalyticsSummaryError';
import AnalyticsDetailsView from './AnalyticsDetailsView';
import AnalyticsUnauthView from './AnalyticsUnauthView';

export function AnalyticsContainer() {
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
         <GoBackButton />
         {user.userData.username &&
            analyticsSummary &&
            analyticsSummary.responseStatus === 'SUCCESS' &&
            user.userData.account_type !== 'PR' && (
               <AnalyticsSummaryView analyticsSummary={analyticsSummary} />
            )}

         {user.userData.username &&
            analyticsSummary &&
            analyticsSummary.responseStatus !== 'SUCCESS' && (
               <AnalyticsSummaryError />
            )}

         {user.userData.username &&
            (analyticsWishlistDetails || analyticsBuyButtonDetails) &&
            user.userData.account_type !== 'PR' && (
               <AnalyticsDetailsView
                  analyticsBuyButtonDetails={analyticsBuyButtonDetails}
                  analyticsWishlistDetails={analyticsWishlistDetails}
               />
            )}

         {user.userData.username && user.userData.account_type === 'PR' && (
            <AnalyticsUnauthView />
         )}
      </div>
   );
}
